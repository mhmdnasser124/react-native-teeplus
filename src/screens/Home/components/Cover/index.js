import { ImageBackground, TouchableOpacity, View } from "react-native";

import React from "react";
import { Text } from "core/components";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import styles from "./styles";

const Cover = ({ onLayout, onPress }) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <ImageBackground source={require("assets/images/homeCover.png")} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "transparent" }} resizeMode="cover">
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>home.welcome</Text>
          <TouchableOpacity style={{ backgroundColor: colors.primary, borderColor: colors.white, borderRadius: 8, borderWidth: 1, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 8, marginTop: 15 }} onPress={onPress}>
            <Text numberOfLines={2} style={{ color: colors.white, fontFamily: getFontFamily("primary", 700) }}>
              home.browseNewProducts
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Cover;
