import React from "react";
import { Platform, View } from "react-native";

const StatusBar = ({ style }) =>Platform.OS=='ios'&& <View style={[styles.statusBar, style]}></View>;
export default StatusBar;
const styles = {
  statusBar: {
    backgroundColor: "white",
    height: 50,
  },
};
