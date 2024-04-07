import { fromCreditCardNumber, toCreditCardNumber } from "core/utils/helpers";

import { CreditDate } from "./helpers";
import { PixelRatio } from "react-native";
import { libraryConfigs } from "core/configs";

const getStyles = (style) => {
  const styles = {
    ...(Array.isArray(style) ? style.reduce((obj, item) => Object.assign(obj, item), {}) : style),
  };
  return {
    color: "black",
    ...styles,
    fontSize: PixelRatio.roundToNearestPixel(styles?.fontSize || 14),
  };
};

const getConfigProps = (componentName) => libraryConfigs.current.components?.[componentName]?.props || {};

const mergeProps = (propsData, configProps) => ({
  ...configProps,
  ...propsData,
  style: {
    ...configProps.style,
    ...getStyles(propsData.style),
  },
});

const textInputsMask = {
  CreditNumber: { converter: toCreditCardNumber, reverser: fromCreditCardNumber },
  CreditDate: { converter: CreditDate, reverser: CreditDate },
};

export { getConfigProps, getStyles, mergeProps, textInputsMask };
