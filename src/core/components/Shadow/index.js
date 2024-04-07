import { StyleSheet, View } from "react-native";

import React from "react";

const Shadow = ({ style }) => <View style={[styles.shadow, style]} />;

export default Shadow;

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    top: 50,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: -10,
  },
});
