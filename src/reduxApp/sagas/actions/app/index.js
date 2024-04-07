import { put } from "redux-saga/effects";
import AppActions from "reduxApp/actions/app";

export const appSagas = {
  *startup() {
    yield put(AppActions.onStartupSucceeded());
  },
};
