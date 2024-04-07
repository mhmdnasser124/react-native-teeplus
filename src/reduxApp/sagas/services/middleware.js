import { END, eventChannel } from "redux-saga";

import AppActions from "reduxApp/actions/app";
import EntityActions from "reduxApp/actions/entity";
import ReactNativeBlobUtil from "react-native-blob-util";
import colors from "constants/colors";
import { getDownloadConfigs } from "reduxApp/utils/fileManager";
import { isEmpty } from "reduxApp/utils/helpers";
import { notificationIcons } from "constants/enmu";
import { put } from "redux-saga/effects";
import { setGlobalNotifications } from "core/providers";

function* middleware(res) {
  if (isEmpty(res.status)) return null;

  const { method, status, endpoint, showSuccessNotification = false, successDelay = 0, failDelay = 0, showFailNotification = true, onSuccess = () => {}, onFailure = () => {}, data, cacheKey } = res;

  switch (status) {
    case 200:
      !!showSuccessNotification && setTimeout(() => showNotificationWhenSuccess(data), successDelay);
      yield put(EntityActions.requestSucceeded({ method, endpoint, data }));
      if (cacheKey) yield put(AppActions.addToCache({ key: cacheKey, data }));
      yield put(AppActions.setUserData({ isBanned: false }));
      onSuccess({ data, status });
      break;
    case 201:
      !!showSuccessNotification && setTimeout(() => showNotificationWhenSuccess(data), successDelay);
      yield put(EntityActions.requestSucceeded({ method, endpoint, data }));
      yield put(AppActions.setUserData({ isBanned: false }));
      onSuccess({ data, status });
      break;
    case 203:
      !!showSuccessNotification && setTimeout(() => showNotificationWhenSuccess(data), successDelay);
      yield put(AppActions.setUserData({ isBanned: true }));
      break;
    case 400:
      !!showFailNotification && setTimeout(() => showNotificationWhenFail(data), failDelay);
      onFailure({ data, status });
      yield put(EntityActions.requestFailed({ method, endpoint, data }));
      break;
    case 401:
      !!showFailNotification && setTimeout(() => showNotificationWhenFail(data), failDelay);
      onFailure({ data, status });
      yield put(EntityActions.requestFailed({ method, endpoint, data }));
      yield put(AppActions.logout());
      break;
    case 403:
      !!showFailNotification && setTimeout(() => showNotificationWhenFail(data), failDelay);
      onFailure({ data, status });
      yield put(EntityActions.requestFailed({ method, endpoint, data }));
      break;
    case 502:
      !!showFailNotification &&
        setTimeout(
          () =>
            showNotificationWhenFail({
              Message: "Somethings went wrong, please try again later",
            }),
          failDelay,
        );
      onFailure({ data, status });
      yield put(EntityActions.requestFailed({ method, endpoint, data }));
      break;
    default:
      !!showFailNotification &&
        setTimeout(
          () =>
            showNotificationWhenFail({
              Message: "Somethings went wrong, please try again later",
              ...data,
            }),
          failDelay,
        );
      onFailure({ data, status });
      yield put(EntityActions.requestFailed({ method, endpoint, data }));
  }
}

export function downloadMiddleware({ onFailure, onStart, showSuccessNotification = false, showFailNotification = false, onFinish, onProgress, endpoint: { data: url }, method }) {
  return eventChannel((emitter) => {
    !!onStart && onStart();
    const { configOptions, downloadPath } = getDownloadConfigs("Files", url);
    ReactNativeBlobUtil.config(configOptions)
      .fetch(method, url)
      .progress({ count: 2 }, (received, total) => {
        const progress = Math.floor((received / total) * 100);
        emitter(
          EntityActions.downloadOnProgress({
            method: method,
            endpoint: url,
            data: { progress: progress },
          }),
        );
        !!onProgress && onProgress({ progress: progress });
      })
      .then((res) => {
        !!showSuccessNotification && showNotificationWhenSuccess({ Message: "Download Success" });
        emitter(
          EntityActions.requestSucceeded({
            method: method,
            endpoint: url,
            data: downloadPath,
          }),
        );
        !!onFinish && onFinish(downloadPath);
        emitter(END);
      })
      .catch((e) => {
        !!showFailNotification && showNotificationWhenFail({ Message: "Download Failed" });
        emitter(EntityActions.requestFailed({ method, endpoint: url, error: e }));
        !!onFailure && onFailure(e);
        emitter(END);
      });
    return () => {};
  });
}

export const showNotificationWhenFail = ({ Message }) =>
  setGlobalNotifications({
    isShow: true,
    title: "",
    message: Message,
    color: colors.errorGradient,
    borderColor: colors.errorBorder,
    icon: notificationIcons.error,
  });
export const showNotificationWhenSuccess = ({ Message }) =>
  setGlobalNotifications({
    isShow: true,
    title: "",
    message: Message,
    color: colors.successGradient,
    borderColor: colors.successBorder,
    modalOverlay: true,
    icon: notificationIcons.success,
  });

export default middleware;
