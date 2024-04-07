import { ActivityIndicator, TouchableOpacity } from "react-native";

import React from "react";
import { Text } from "core/components";
import colors from "constants/colors";
import styles from "./styles";

const BorderedButton = ({ onPress, title, buttonStyle, textStyle, disabled = false, isLoading }) => (
  <TouchableOpacity disabled={disabled} style={[styles.button, buttonStyle]} onPress={onPress}>
    {isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={[styles.text, textStyle, !!textStyle?.fontSize && { lineHeight: textStyle?.fontSize + 1 }]}>{title}</Text>}
  </TouchableOpacity>
);

export default BorderedButton;
