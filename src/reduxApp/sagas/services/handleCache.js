import { put, select } from "redux-saga/effects";
import { isEmpty } from "reduxApp/utils/helpers";

import EntityActions from "reduxApp/actions/entity";

function* handleCache(data) {
  if (data.cacheKey) {
    const cacheData = yield select((store) => store.app.cache.data);
    if (!isEmpty(cacheData?.[data.cacheKey])) {
      yield put(EntityActions.requestSucceeded({ method: data.method, endpoint: data.endpoint, data: cacheData[data.cacheKey] }));
      data.onSuccess(cacheData[data.cacheKey]);
    }
  }
}

export default handleCache;
