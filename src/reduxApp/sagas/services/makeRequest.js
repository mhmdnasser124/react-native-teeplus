import axios from "axios";
import { call, fork } from "redux-saga/effects";
import { httpRequest } from "reduxApp/utils/api";
import { languageParser } from "reduxApp/utils/helpers";
import middleware from "./middleware";

var lastEndpoint = "";
var cancelTokenSource = null;
var currentTask = null;

function* checkApi(data) {
  if (lastEndpoint === data.endpoint && cancelTokenSource) cancelTokenSource.cancel("Request canceled by new request");
  lastEndpoint = data.endpoint;
  cancelTokenSource = axios.CancelToken.source();
  currentTask = yield fork(makeRequest, data, cancelTokenSource);
}

function* makeRequest(data) {
  try {
    const { result } = yield call(httpRequest, data, cancelTokenSource);
    var actualResult = yield result;
    var payload = { ...data, ...languageParser(actualResult) };
    if (!isEmpty(payload.status)) yield middleware(payload);
  } finally {
    currentTask = null;
    cancelTokenSource = null;
  }
}
export default checkApi;
