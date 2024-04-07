import Icon from "core/components/Icon";
import React from "react";
import { Text } from "core/components";
import { View } from "react-native";
import colors from "constants/colors";
import styles from "./styles";

const CustomBar = (props) => {
  const {
    isFocused,
    icon: { component, name, selectedName, size = 22, containerStyle, color, label, count },
  } = props;
  const iconColor = color ? { color } : {};

  return (
    <View style={styles.container}>
      {!!component ? (
        component()
      ) : (
        <View style={styles.iconContainer}>
          {!!count && (
            <View style={{ position: "absolute", backgroundColor: colors.primary, borderRadius: 10, top: -10, left: 5, width: 20, height: 20, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: colors.white, fontSize: 11 }}>{count}</Text>
            </View>
          )}
          <Icon isRtl={false} containerStyle={[containerStyle]} name={isFocused ? selectedName : name} size={size} {...iconColor} />
          <Text style={styles.labelText({ isFocused })}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomBar;
