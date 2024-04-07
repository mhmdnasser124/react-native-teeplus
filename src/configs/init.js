import "react-native-gesture-handler";

import { setComponentsConfig, setSourcesConfig } from "core/configs";

import { LogBox } from "react-native";
import env from "configs/env";
import { getFontFamily } from "utils/helpers";

const {
  facebook: { appId },
} = env;

export default async () => {
  LogBox.ignoreAllLogs();

  setComponentsConfig({
    Text: {
      props: {
        style: {
          fontFamilyText: getFontFamily("primary", 400),
          fontFamilyNumber: getFontFamily("secondary", 400),
        },
        translate: true,
      },
    },
    TextInput: {
      props: {
        style: {
          fontFamilyText: getFontFamily("primary", 700),
          fontFamilyNumber: getFontFamily("secondary", 700),
        },
        placeholderStyle: {
          fontFamily: getFontFamily("secondary", 400),
        },
        translate: true,
      },
    },
    RemoteData: {
      props: {
        dataAttr: ["data", "Data"],
        initPage: 0,
        pageKey: "skip",
        lengthKey: "length",
        pageAction: (page) => page + 10,
        limitValue: 10,
      },
    },
  });
  setSourcesConfig({
    svg: require("assets/svg/index.js"),
  });
};
