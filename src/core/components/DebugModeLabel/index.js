import React from "react";
import { Platform, Text, View } from "react-native";

const DebugModeLabel = ({ label }) => {
  if (label!=='prod')
    return (
      <View opacity={0.5} style={{ backgroundColor: "red", position: "absolute", top: 0, left: Platform.OS=='android'?0: 40, padding: 3, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 7 }}>{label} mode</Text>
      </View>
    );
  else return null;
};

export default DebugModeLabel;
