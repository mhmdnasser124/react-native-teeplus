import { I18nManager, TouchableOpacity, View } from "react-native";

import React from "react";
import { libraryConfigs } from "core/configs";

const Icon = (props) => {
  const iconProps = libraryConfigs.current.components?.Icon?.props;
  const svgSource = libraryConfigs.current.sources?.svg;

  const mergedProps = {
    ...iconProps,
    ...props,
  };
  const { name, style, containerStyle, width, height, size, onPress, isRtl = true, fill = "none", stroke = "none" } = mergedProps;
  const rtl = I18nManager.isRTL && isRtl;

  const IconContainer = svgSource?.default?.[name];
  const Container = onPress ? TouchableOpacity : View;

  const iconStyle = {
    width: size || width,
    height: size || height,
  };

  if (rtl) {
    iconStyle.transform = [{ scaleX: -1 }];
  }

  return (
    <View style={[containerStyle, rtl && { flexDirection: "row-reverse" }]}>
      <Container onPress={onPress} style={style}>
        {IconContainer && <IconContainer {...iconStyle} fill={fill} stroke={stroke} />}
      </Container>
    </View>
  );
};

export default Icon;
