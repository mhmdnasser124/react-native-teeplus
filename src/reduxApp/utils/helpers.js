import { getCurrentLanguage } from "core/providers";

export const isEmpty = (value) => value === undefined || value === null || value === "null" || (typeof value === "object" && Object.keys(value)?.length === 0) || (typeof value === "string" && value.trim()?.length === 0);
export const beautifyQueries = (queries, use_prefix = true) => {
  var requestQueries = "";
  if (!!queries && Object.entries(queries).length > 0)
    Object.entries(queries).map((query, index) => {
      if (!isEmpty(query[1]))
        if (requestQueries == "" && use_prefix == true) requestQueries = `?${query[0]}=${query[1]}`;
        else requestQueries += `&&${query[0]}=${query[1]}`;
    });
  return requestQueries;
};
export const beautifyParams = (params) => {
  var requestParams = "";
  if (!!params && Object.entries(params).length > 0)
    Object.entries(params).map((param) => {
      if (!isEmpty(param[1])) requestParams += `/${param[1]}`;
    });
  return requestParams;
};

export const convertToStars = (inputNumber) => {
  const str = String(inputNumber);
  const len = str.length;
  return len >= 3 ? "*".repeat(len - 3) + str.slice(-3) : "Invalid Input";
};

export const languageParser = (response) => {
  const currentLanguage = getCurrentLanguage;
  const replaceWith = currentLanguage == "ar" ? "en" : "ar";
  function replaceEnFields(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key.endsWith(`_${replaceWith}`)) {
          const correspondingArField = key.replace(`_${replaceWith}`, `_${currentLanguage}`);
          if (obj[correspondingArField]) {
            obj[key.replace(`_${replaceWith}`, "")] = obj[correspondingArField];
            // delete obj[key];
          }
        } else if (typeof obj[key] === "object") {
          replaceEnFields(obj[key]);
        }
      }
    }
    return obj;
  }

  return replaceEnFields({ ...response });
};

export function convertArabicToEnglish(object) {
  if (typeof object !== "object") throw new Error("Input must be an object");

  function convertNumberToEnglish(number) {
    const arabicNumerals = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    const englishNumerals = "0123456789";

    // Include the Arabic decimal separator conversion
    const arabicDecimalSeparator = /٫/g;
    const englishDecimalSeparator = ".";

    let convertedNumber = number.toString();
    arabicNumerals.forEach((arabic, index) => {
      convertedNumber = convertedNumber.replace(arabic, englishNumerals[index]);
    });

    // Replace Arabic decimal separator with English decimal separator
    convertedNumber = convertedNumber.replace(arabicDecimalSeparator, englishDecimalSeparator);

    return convertedNumber;
  }

  const convertedObject = {};
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      const value = object[prop];
      var hasArabicNumerals = /[٠-٩٫]/.test(value); // Include Arabic decimal separator in the regex
      const convertedValue = hasArabicNumerals ? convertNumberToEnglish(value) : value;
      convertedObject[prop] = convertedValue;
    }
  }

  return convertedObject;
}
