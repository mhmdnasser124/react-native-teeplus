import fontFamily from "constants/fontFamily";
import { getCurrentLanguage } from "core/providers";

export const getFontFamily = (type, weight) => {
  var currLng = !!getCurrentLanguage ? getCurrentLanguage : "en";
  return fontFamily[weight][currLng][type];
};

export const parseNumberDots = (value) => {
  var number = parseFloat(value);
  return number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/x/g, ".");
};

export const convertNameToUrl = (name) => {
  const formattedName = name
    .replace(/[^\w\s-]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const baseUrl = "https://www.printful.com/custom/mens/t-shirts/";
  const url = `${baseUrl}${formattedName}`;
  console.log("url=>>> ", url);
  return url;
};

export function parseURLParams(url) {
  const params = [];
  const urlParts = url.split("?");
  if (urlParts.length > 1) {
    const queryString = urlParts[1];
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      params.push({ key: decodeURIComponent(key), value: decodeURIComponent(value) });
    }
  }
  return params;
}
