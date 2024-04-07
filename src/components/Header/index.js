import { Icon, Text } from "core/components";
import { TouchableOpacity, View } from "react-native";

import React from "react";
import { goBack } from "core/navigations/actions";
import styles from "./styles";

const Header = ({ showBack = true, label, labelStyle, rightComponent, containerStyle, onGoback }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity disabled={!showBack} style={styles.backButton} onPress={onGoback || goBack}>
        {showBack && <Icon style={styles.backIcon} name="back" />}
      </TouchableOpacity>
      {!!label && (
        <Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={styles.rightComponent}>{!!rightComponent && rightComponent()}</View>
    </View>
  );
};

export default Header;
