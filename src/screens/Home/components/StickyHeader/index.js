import { Shadow, Text } from "core/components";

import React from "react";
import { View } from "react-native";
import colors from "constants/colors";
import styles from "./styles";

const StickyHeader = ({ title, children, stickyEnabled }) => {
  return (
    <>
      <View style={{ backgroundColor: colors.white, paddingTop: 20, paddingBottom: 3, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
      {!!stickyEnabled && <Shadow />}
    </>
  );
};

export default StickyHeader;
