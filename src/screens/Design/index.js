import { Header, Loading } from "components";
import React, { useRef } from "react";
import { convertNameToUrl, parseURLParams } from "utils/helpers";
import { hp, w } from "utils/responsive";
import { navigate, reset } from "core/navigations/actions";
import { useDispatch, useSelector } from "react-redux";

import AppActions from "reduxApp/actions/app";
import LottieView from "lottie-react-native";
import { Text } from "core/components";
import { View } from "react-native";
import WebView from "react-native-webview";
import colors from "constants/colors";
import { useState } from "react-native-shbib-tools/hooks";

const DesignWebview = ({ route: { params } }) => {
  const webViewRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.app);
  const { currentProduct } = userData;
  const { name } = params;

  const [state, setState] = useState({
    initState: {
      error: false,
      loading: true,
    },
  });
  const { loading, error } = state;
  if (!!error)
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header label={"teeplus"} />
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <LottieView speed={1} resizeMode="cover" source={require("assets/lottie/error.json")} autoPlay={true} loop={true} style={{ width: w(200) }} />
          <Text style={{ fontSize: 40, fontWeight: "bold", color: colors.primary }}>404</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 3, color: colors.primary, textAlign: "center", marginHorizontal: 25 }}>No worries, teeplus team is on it!</Text>
        </View>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <Header label={"teeplus"} />
      <WebView
        ref={webViewRef}
        startInLoadingState={false}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        onNavigationStateChange={(e) => {
          setState({ loading: e.loading });
          if (e?.title?.includes("404")) setState({ error: true });
          if (Object.keys(parseURLParams(e?.url))?.length != 0) {
            dispatch(
              AppActions.addToBasket({
                name: currentProduct.title,
                price: 25.99,
                count: 1,
                currency: currentProduct.currency,
                imageURL: currentProduct.image,
                options: parseURLParams(e?.url),
                cartId: currentProduct.id,
                maxQty: 1000,
              }),
            );
            reset("AllScreens");
            navigate("Cart");
          }
        }}
        originWhitelist={["*"]}
        javaScriptEnabledAndroid={true}
        source={{ uri: convertNameToUrl(name) }}
        bounces={false}
        automaticallyAdjustContentInsets={true}
      />

      {loading && <Loading absolute containerStyle={{ marginTop: hp(100) }} />}
    </View>
  );
};

export default DesignWebview;
