import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import Reducers from "./actions";
import ReduxThunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import storage from "@react-native-community/async-storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["entity"],
  stateReconciler: autoMergeLevel2,
};

const configureStore = (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  middleware.push(ReduxThunk);

  enhancers.push(applyMiddleware(...middleware));
  var store;
  if (!!window.__REDUX_DEVTOOLS_EXTENSION__) store = createStore(rootReducer, compose(...enhancers, !!window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  else store = createStore(rootReducer, composeWithDevTools(...enhancers));

  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
};

const createReduxStore = () => {
  let reducers = combineReducers({ ...Reducers });
  const persistedReducer = persistReducer(persistConfig, reducers);
  return configureStore(persistedReducer, rootSaga);
};

export const { store, persistor } = createReduxStore();
