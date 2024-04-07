import { all, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { AppTypes } from "reduxApp/actions/app";
import { EntityTypes } from "reduxApp/actions/entity";
import { appSagas, entitySagas } from "./actions";

export default function* root() {
  yield all([takeEvery(EntityTypes.REQUEST, entitySagas.request), takeEvery(EntityTypes.DOWNLOAD, entitySagas.download), takeLatest(AppTypes.STARTUP, appSagas.startup)]);
}

// const takeLatestByEndPoint = (patternOrChannel, saga, ...args) =>
//   fork(function* () {
//     let lastTasks = {};
//     let lastEndpoint = "";
//     while (true) {
//       const action = yield take(patternOrChannel);
//       if (lastEndpoint == action.data.endpoint) {
//         // yield cancel(lastTasks[action.type]);
//         yield put({ type: "CANCEL_REQUEST_ACTION" });
//       }
//       lastEndpoint = action.data.endpoint;
//       lastTasks[action.type] = yield fork(saga, ...args.concat(action));
//     }
//   });
