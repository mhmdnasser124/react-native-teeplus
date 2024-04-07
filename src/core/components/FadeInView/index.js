import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Animated } from "react-native";

const FadeInView = (props) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    return () => Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start();
  });

  return <Animated.View style={[{ flex: 1, opacity: fadeAnim }, props?.style]}>{props.children}</Animated.View>;
};

export default FadeInView;
