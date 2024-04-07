import { Text, TextInput } from "react-native";

import App from "./App";
import { LocalizationProvider } from "core/providers";
import { LoggerProvider } from "providers";
import { Provider } from "react-redux";
import React from "react";
import languages from "languages";
import { parseNumberDots } from "utils/helpers";
import { store } from "reduxApp/store";

const Root = () => (
  <LocalizationProvider translations={languages}>
    <Provider store={store}>
      <LoggerProvider disable>
        <App />
      </LoggerProvider>
    </Provider>
  </LocalizationProvider>
);

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

Number.prototype.parseNumberDots = function () {
  return parseNumberDots(this);
};
String.prototype.parseNumberDots = function () {
  return parseNumberDots(this);
};

export default Root;
