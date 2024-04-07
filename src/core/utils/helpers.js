import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import { LayoutAnimation } from "react-native";
import _ from "lodash";
import isEqual from "lodash/isEqual";
import reduce from "lodash/reduce";
const animatedInEaseOut = () => LayoutAnimation.configureNext(LayoutAnimation.create(300, "easeInEaseOut", "opacity"));
const animatedLinear = () => LayoutAnimation.configureNext(LayoutAnimation.create(300, "linear", "opacity"));
const animatedSpring = () => LayoutAnimation.configureNext(LayoutAnimation.create(300, "spring", "opacity"));

const formatDate = (date) => {
  if (!date) return "";
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`;
};

const convert24To12 = (hr, mn) => `${hr % 12 || 12}h${mn}${hr < 12 ? " AM" : " PM"}`;
const getHMS = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  return { day, month, year, hours, minutes };
};
const formatTime = (date) => {
  if (!date) return "";
  const time = date.split("T")[1];
  if (!time) return "";
  const t = time.split(":");
  if (!t || t.length < 1) return "";
  const hr = parseInt(t[0]);
  let AMText, PMText;
  AMText = "AM";
  PMText = "PM";

  return `${hr % 12 || 12}:${t[1]} ${hr < 12 ? AMText : PMText}`;
};

const dateToLocalTimezone = (date, revert) => {
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  let offset = new Date().getTimezoneOffset() / 60;
  offset = revert ? offset : -1 * offset;

  date = date.addHours(offset);
  return date;
};
const getMonthAbbreviation = (monthNumber) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  if (monthNumber >= 1 && monthNumber <= 12) return months[monthNumber - 1];
  else throw new Error("Invalid month number. Please provide a number between 1 and 12.");
};
const hdp = (percent) => hp(percent);
const wdp = (percent) => wp(percent);
const isURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return !!pattern.test(str);
};

const isSVGURI = (str) => {
  var pattern = /^(https?:\/\/|data:image\/svg\+xml,)/;
  return pattern.test(str);
};
const getBase64FormattedUri = (response) => `data:${response.mime};base64,${response.data}`;
const getExtFromMimeType = (uri) => uri.substring(uri.lastIndexOf("/") + 1);
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === "null" ||
  (typeof value === "object" && Object.keys(value)?.length === 0) ||
  (typeof value === "string" && value.trim()?.length === 0);
const getAttrData = (dataAttr, data) => {
  var dataTemp = data;
  if (dataAttr.length > 0)
    dataAttr.map((attr, index) => {
      if (index == 0) dataTemp = data[attr];
      else dataTemp = dataTemp[attr];
    });
  return dataTemp;
};

const getNumberSign = (item) => {
  let flag = false;
  if (item > 0) {
    item = Math.abs(item); 
    flag = true; 
  }
  return { value: item, flag: flag };
};
const compareObjects = (firstVal, secondVal) => JSON.stringify(firstVal) === JSON.stringify(secondVal);

const differentObject = (obj1, obj2) => {
  return reduce(
    obj1,
    function (result, value, key) {
      return isEqual(value, obj2[key]) ? result : result.concat(key);
    },
    [],
  );
};

const reducerOrAnd = (arr) => {
  const reducerOr = (accumulator, currentValue) => accumulator || currentValue;
  const reducerAnd = (accumulator, currentValue) => accumulator && currentValue;
  return arr.reduce(reducerOr).reduce(reducerAnd);
};

const setPropertyValue = (obj, value, path) => {
  var i;
  path = path.split(".");
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];
  obj[path[i]] = value;
};

const mergePropertiesWithOverRide = (obj1, obj2, overRideKeys) => {
  let mergedObj = _.mergeWith(obj1, obj2, (objValue, srcValue, key) => {
    if (overRideKeys.includes(key)) return srcValue;
  });
  return mergedObj;
};

const beautifyQueries = (queries, use_prefix = true) => {
  var requestQueries = "";
  if (!!queries && Object.entries(queries).length > 0)
    Object.entries(queries).map((query, index) => {
      if (!isEmpty(query[1]))
        if (requestQueries == "" && use_prefix == true) requestQueries = `?${query[0]}=${query[1]}`;
        else requestQueries += `&&${query[0]}=${query[1]}`;
    });
  return requestQueries;
};

const beautifyParams = (params) => {
  var requestParams = "";
  if (!!params && Object.entries(params).length > 0)
    Object.entries(params).map((param) => {
      if (!isEmpty(param[1])) requestParams += `/${param[1]}`;
    });
  return requestParams;
};

const isWholeNumber = (inputString) => !isNaN(inputString) && inputString.trim() !== "" &&( Number.isInteger(Number(inputString))|| Number(Number(inputString)));

const toCreditCardNumber = (value) => value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
const fromCreditCardNumber = (value) => value.replace(/\s/g, "");

const CreditDate = (text) => {
  if (text.length > 2 && text.charAt(2) !== '/') 
    text = text.slice(0, 2) + '/' + text.slice(2)
  return text
};

export {
  CreditDate,
  toCreditCardNumber,
  fromCreditCardNumber,
  isWholeNumber,
  beautifyParams,
  beautifyQueries,
  mergePropertiesWithOverRide,
  dateToLocalTimezone,
  formatTime,
  getAttrData,
  animatedInEaseOut,
  animatedLinear,
  animatedSpring,
  convert24To12,
  formatDate,
  getBase64FormattedUri,
  getExtFromMimeType,
  getHMS,
  getMonthAbbreviation,
  hdp,
  isEmpty,
  isSVGURI,
  isURL,
  wdp,
  getNumberSign,
  compareObjects,
  differentObject,
  reducerOrAnd,
  setPropertyValue,
};