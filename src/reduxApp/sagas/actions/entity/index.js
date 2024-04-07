import { call, delay, fork, put, take } from "redux-saga/effects";
import { handleCache, handleMockData, middleware } from "reduxApp/sagas/services";
import { isEmpty, languageParser } from "reduxApp/utils/helpers";

import axios from "axios";
import { downloadMiddleware } from "reduxApp/sagas/services/middleware";
import handleCustomRequest from "./handleRequests";
import { httpRequest } from "../../../utils/api";

var lastEndpoint = "";
var cancelTokenSource = null;
var currentTask = null;

function* makeRequest(data, cancelTokenSource) {
  try {
    const { result } = yield call(httpRequest, data, cancelTokenSource);
    var actualResult = yield result;
    var payload = { ...data, ...languageParser(actualResult) };
    yield middleware(payload);
    // yield handleCustomRequest(payload);
  } finally {
    currentTask = null;
    cancelTokenSource = null;
  }
}

export const entitySagas = {
  *request({ data }) {
    try {
      yield handleCache({ data });
      if (data?.delay) yield delay(data?.delay);
      if (data.mockData) {
        yield handleMockData(data);
      } else {
        if (lastEndpoint === data.endpoint && !!!data.disableCancel && cancelTokenSource) cancelTokenSource.cancel("Request canceled by new request");
        lastEndpoint = data.endpoint;
        cancelTokenSource = axios.CancelToken.source();
        currentTask = yield fork(makeRequest, data, cancelTokenSource);
      }
    } catch (err) {
      yield middleware({ ...data, data: { message: "Connection Error", code: 400 } });
    }
  },

  *download({ data }) {
    const channel = yield call(downloadMiddleware, data);
    try {
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    } catch (error) {
      !!data.onFailure && data.onFailure(error);
      yield put(EntityActions.requestFailed({ method: data.method, endpoint: data.endpoint.data.url, data: error }));
    }
  },
};
