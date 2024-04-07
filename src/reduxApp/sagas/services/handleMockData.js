import { delay } from "redux-saga/effects";
import { middleware } from "reduxApp/sagas/services";
import { languageParser } from "reduxApp/utils/helpers";
import handleCustomRequest from "../actions/entity/handleRequests";

function* handleMockData(data) {
  yield delay(1000);
  const res = languageParser(data.mockData);
  var payload = { ...data, data: languageParser(res) };
  yield middleware({ ...payload, status: 200 });
  yield handleCustomRequest(payload);
}

export default handleMockData;
