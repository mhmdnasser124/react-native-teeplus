import { Icon, Text } from "core/components";
import React, { useEffect, useRef } from "react";
import { TouchableOpacity, View } from "react-native";

import { getCurrentLanguage } from "core/providers";
import styles from "./styles";
import { useState } from "core/hooks";

const ProductQuantityPicker = ({ containerStyle, value = 0, onChange, mainColor, withDebounce = false, minValue = 0, maxValue }) => {
  const [state, setState] = useState({ initState: { currentValue: value } });
  useEffect(() => {
    setState({ currentValue: value });
  }, [value]);
  const isInit = useRef(true);
  const { currentValue } = state;

  const onChangeQuantity = (type) => {
    if (type === "-") {
      if (currentValue - 1 <= minValue) onChange(currentValue - 1);
      else {
        setState({ currentValue: currentValue - 1 });
      }
    } else if (type === "+") {
      setState({ currentValue: currentValue + 1 });
    }
  };

  useEffect(() => {
    var delayDebounce;
    if (!!!isInit.current) {
      delayDebounce = setTimeout(() => !!onChange && onChange(currentValue), withDebounce ? 500 : 0);
    }
    isInit.current = false;
    return () => clearTimeout(delayDebounce);
  }, [currentValue]);

  const counterComponents = [];

  return (
    <View style={containerStyle}>
      <View style={styles.quantityContainer}>
        {getCurrentLanguage == "ar" && (
          <>
            <TouchableOpacity disabled={!!maxValue ? currentValue > maxValue - 1 : false} onPress={() => onChangeQuantity("+")} style={styles.rtlQuantityButtonPlus}>
              <Icon style={styles.icon} name="plus" fill={mainColor} />
            </TouchableOpacity>
            <Text style={styles.quantityText({ mainColor })}>{currentValue}</Text>
            <TouchableOpacity onPress={() => onChangeQuantity("-")} disabled={currentValue === minValue} style={styles.rtlQuantityButtonMinus}>
              <Icon style={styles.icon} name={currentValue !== 0 ? "minus" : "minusGray"} fill={mainColor} />
            </TouchableOpacity>
          </>
        )}
        {getCurrentLanguage != "ar" && (
          <>
            <TouchableOpacity onPress={() => onChangeQuantity("-")} disabled={currentValue === minValue} style={styles.ltrQuantityButtonMinus}>
              <Icon style={styles.icon} name={currentValue !== 0 ? "minus" : "minusGray"} fill={mainColor} />
            </TouchableOpacity>
            <Text style={styles.quantityText({ mainColor })}>{currentValue}</Text>
            <TouchableOpacity disabled={!!maxValue ? currentValue > maxValue - 1 : false} onPress={() => onChangeQuantity("+")} style={styles.ltrQuantityButtonPlus}>
              <Icon style={styles.icon} name="plus" fill={mainColor} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ProductQuantityPicker;
