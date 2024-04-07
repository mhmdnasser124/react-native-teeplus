import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Loading = ({ containerStyle, absolute, transparent, loading = true }) => {
  if (!loading) return null;

  var additionalStyles = {};
  if (absolute)
    additionalStyles = {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  if (transparent)
    additionalStyles = {
      ...additionalStyles,
      position: "absolute",
      backgroundColor: null,
    };
  return (
    <View style={[styles.container, containerStyle, additionalStyles]}>
      <LottieView source={require("assets/lottie/loading.json")} autoPlay loop={true} style={styles.logo} />
    </View>
  );
};

export default Loading;
