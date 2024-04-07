import { TouchableOpacity, View } from "react-native";

import React from "react";

export const TabBar = ({ state, descriptors, navigation, CustomBottomBar, containerStyle, style }) => {
  const styles = {
    tabBarRoot: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  };
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) return null;
  return (
    <View style={containerStyle}>
      <View style={[styles.tabBarRoot, style]}>
        {state.routes.map((route, index) => {
          const {
            options: { tabBarLabel, title, icon },
          } = descriptors[route.key];
          const label = tabBarLabel !== undefined ? tabBarLabel : title !== undefined ? title : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          var buttonProps = { isFocused, label, icon };
          return (
            <TouchableOpacity onPress={onPress} key={index}>
              <CustomBottomBar {...buttonProps} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
