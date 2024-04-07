import React from "react";
import { ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
const Image = (props) => <FastImage source={props.source} resizeMode={FastImage.resizeMode[props.resizeMode]}  renderIndicator={() => <ActivityIndicator />} {...props} />;

export default Image;
