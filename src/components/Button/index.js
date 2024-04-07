import { Icon, Text } from "core/components";
import { TouchableOpacity, View } from "react-native";

import React from "react";
import colors from "constants/colors";
import styles from "./styles";

const Button = ({ isRtlLeftIcon = true, label, disabled, onPress, containerStyle, enabledButtonColor = colors.sapphireBlue, enabledTextColor = colors.white, leftIcon, labelStyle, iconStyle, contentStyle, leftIconComponent }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.container({ disabled, enabledButtonColor }), contentStyle]}>
        {!!!leftIconComponent && !!leftIcon && <Icon isRtl={isRtlLeftIcon} name={leftIcon} style={[styles.icon, iconStyle]} />}
        {!!leftIconComponent && leftIconComponent()}
        <Text style={[styles.text({ disabled, enabledTextColor }), labelStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
