import { Image, Text } from "core/components";
import { TouchableOpacity, View } from "react-native";

import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";

const HorizontalSelector = ({ containerStyle, value, onChange, mainColor, data }) => {
  return (
    <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false} contentContainerStyle={containerStyle} showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: "row" }}>
      {data.map((item, index) => {
        var isSelected = value == item.id;
        return (
          <TouchableOpacity
            key={item.id.toString()}
            onPress={() => {
              const newValue = item.id;
              onChange(newValue);
            }}
            style={{ ...styles.categoryItem({ isFirstItem: index === 0, isSelected, mainColor }) }}
          >
            <View style={{ backgroundColor: "white", padding: 4.3, borderRadius: 20 }}>
              <Image containerStyle={styles.categoryIcon} style={styles.categoryIconStyle} source={{ uri: item.image_url }} />
            </View>
            <Text style={styles.categoryText({ isSelected })}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default React.memo(HorizontalSelector, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
