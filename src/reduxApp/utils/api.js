import { beautifyParams, beautifyQueries, convertArabicToEnglish } from "reduxApp/utils/helpers";

import { Platform } from "react-native";
import axios from "axios";
import constants from "configs/env";
import { create } from "apisauce";
import { dictionary } from "constants/enmu";
import { getCurrentLanguage } from "core/providers";

const { timeout } = constants.api;
const version = constants.version;

const { api } = constants.url;
export const axiosInstance = axios.create({
  timeout: timeout,
  headers: {
    platform: Platform.OS,
    platformActiveVersion: version[Platform.OS],
    access_key: "PMAT-01HAPYMRHBCJ29SRQHSYZQDZ9S",
  },
});

const Api = create({ axiosInstance });

const httpRequest = (data, cancelTokenSource) => {
  const { method, endpoint, params, queries, body, headers, baseUrl = api, type, file, fileName, onProgress, onUploadEnd } = data;
  var { store } = require("reduxApp/store");
  var { Token } = store.getState().app.userData;
  const uploadHeader = method === "UPLOAD" ? { "Content-Type": "multipart/form-data" } : {};
  var uploadBody = {};
  if (method === "UPLOAD") {
    const form = new FormData();
    form.append("file", { uri: file, type: type, name: fileName });
    uploadBody = form;
  }

  var additionalHeaders = Token
    ? {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Accept-Language": dictionary[getCurrentLanguage],
          ...constants.headers,
          ...headers,
          ...uploadHeader,
        },
      }
    : { headers: { ...constants.headers, ...headers, ...uploadHeader } };

  const apiOptions = {
    ...additionalHeaders,
    cancelToken: cancelTokenSource.token,
  };
  var endpointRequest = `${baseUrl}${!!endpoint ? "/" + endpoint : ""}${beautifyParams(params)}${beautifyQueries(queries)}`;

  var methodRequest = {
    GET: () => Api.get(endpointRequest, {}, apiOptions),
    POST: () => Api.post(endpointRequest, bodyPipline(body), apiOptions),
    DELETE: () => Api.delete(endpointRequest, {}, apiOptions),
    PUT: () => Api.put(endpointRequest, bodyPipline(body), apiOptions),
    UPLOAD: () =>
      Api.post(endpointRequest, uploadBody, {
        ...apiOptions,
        onUploadProgress: (progressEvent) => {
          let percentComplete = progressEvent.loaded / progressEvent.total;
          percentComplete = parseInt(percentComplete * 100);
          if (percentComplete === 100) onUploadEnd();
          else onProgress(percentComplete);
        },
      }),
  };

  return {
    result: methodRequest[method](),
  };
};

const bodyPipline = (body) => {
  return convertArabicToEnglish(body);
};

export { httpRequest };
