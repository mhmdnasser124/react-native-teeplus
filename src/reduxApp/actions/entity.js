import { createActions, createReducer } from "reduxsauce";

import Immutable from "seamless-immutable";

const { Types, Creators } = createActions(
  {
    request: ["data"],
    requestSucceeded: ["data"],
    requestFailed: ["data"],
    download: ["data"],
    downloadOnProgress: ["data"],
    unRegisterRequest: ["data"],
  },
  {
    prefix: "Entity/",
  },
);

export const EntityTypes = Types;
export default Creators;

export const INITIAL_STATE_SINGLE = Immutable({
  errors: null,
  response: null,
  executing: null,
  status: null,
});

export const INITIAL_STATE = Immutable({ METHODS: { GET: {}, POST: {}, DELETE: {}, PATCH: {}, DOWNLOAD: {}, UPLOAD: {} } });

const updateState = (state, method, endpoint, updates) =>
  state.merge({ METHODS: { ...state.METHODS, [method]: { ...state.METHODS[method], [endpoint]: { ...state.METHODS[method]?.[endpoint], ...updates } } } });

export const unRegisterRequest = (state, { data: { endpoint, method } }) => {
  const res = Object.keys(state.METHODS[method]).reduce((previousObject, currentObject) => {
    if (currentObject !== endpoint) return { ...previousObject, [currentObject]: state.METHODS[method][currentObject] };
    return previousObject;
  }, {});
  return state.merge({ METHODS: { ...state.METHODS, [method]: res } });
};
export const request = (state, { data }) => updateState(state, data.method, data.endpoint, { executing: true, errors: null, response: null, status: null });
export const requestSucceeded = (state, { data }) => updateState(state, data.method, data.endpoint, { response: data?.data, executing: false, status: true });
export const requestFailed = (state, { data }) => updateState(state, data.method, data.endpoint, { response: data?.data, executing: false, status: false });
export const download = (state, { data }) => updateState(state, data.method, data.endpoint, { executing: true, errors: null, response: null, status: null });
export const downloadOnProgress = (state, { data }) => updateState(state, data.method, data.endpoint, { progress: data?.progress, status: null });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UN_REGISTER_REQUEST]: unRegisterRequest,
  [Types.REQUEST]: request,
  [Types.DOWNLOAD_ON_PROGRESS]: downloadOnProgress,
  [Types.DOWNLOAD]: download,
  [Types.REQUEST_SUCCEEDED]: requestSucceeded,
  [Types.REQUEST_FAILED]: requestFailed,
});
