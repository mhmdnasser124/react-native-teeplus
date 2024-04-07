import ar from "./ar";
import en from "./en";

export default {
  storageKey: "APP_LANG",
  default: "device",
  languages: [
    {
      label: "English",
      code: "en",
      data: en,
      direction: "ltr",
    },
    {
      label: "العربية",
      code: "ar",
      data: ar,
      direction: "rtl",
    },
  ],
};
