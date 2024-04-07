import { Platform, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { h, w } from "utils/responsive";

import AppActions from "reduxApp/actions/app";
import BackgroundColor from "react-native-background-color";
import LottieView from "lottie-react-native";
import SplashScreen from "react-native-splash-screen";
import { Text } from "core/components";
import colors from "constants/colors";
import { useDispatch } from "react-redux";

const Startup = () => {
  const dispatch = useDispatch();
  const lottieRef = useRef();

  useEffect(async () => {
    if (Platform.OS === "android") {
      setTimeout(() => BackgroundColor.setColor(colors.white), 400);
    } else {
      SplashScreen.hide();
    }
    setTimeout(() => dispatch(AppActions.setUserData({ isLoggedIn: true })), 3000);
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20, color: colors.primary }}>teeplus</Text>
      <View style={{ alignSelf: "center" }}>
        <LottieView speed={2.5} ref={lottieRef} resizeMode="cover" source={require("assets/lottie/splashIcon.json")} autoPlay={true} loop={true} style={{ width: w(300) }} />
        <LottieView speed={1} ref={lottieRef} resizeMode="cover" onAnimationFinish={() => dispatch(AppActions.startup())} source={require("assets/lottie/clothes.json")} autoPlay={true} loop={false} style={{ width: w(270) }} />
      </View>
      <Text style={{ position: "absolute", bottom: h(40) }}>Powered By Mohammed Nofal</Text>
    </View>
  );
};

export default Startup;
