import { Icon, Text } from "core/components";

import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import { h } from "utils/responsive";

const EmptyCart = ({ containerStyle, message }) => (
  <View style={[{ alignItems: "center", justifyContent: "center", alignSelf: "center", flex: 1 }, containerStyle]}>
    <LottieView source={require("assets/lottie/emptyCart.json")} autoPlay loop={true} style={{ width: 200, height: 200 }} />
    <Text style={{ color: colors.primary, textAlign: "center", fontFamily: getFontFamily("primary", 400), fontSize: 32, marginTop: h(32, 394) }}>{message}</Text>
  </View>
);

export default EmptyCart;
