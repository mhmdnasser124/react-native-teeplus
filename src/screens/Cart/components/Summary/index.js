import { FlatList, View } from "react-native";
import { Shadow, Text } from "core/components";

import React from "react";
import colors from "constants/colors";
import styles from "./styles";

const Summary = ({ containerStyle, total }) => {
  const data = [
    { label: "cart.subtotal", value: total },
    { label: "cart.discount", value: 0.0 },
    { label: "cart.serviceFee", value: 0.0 },
    { label: "cart.total", value: total },
  ];

  const summaryItem = ({ item: { label, value, color, hide, fontWeight }, index }) =>
    hide == true ? null : (
      <View style={styles.itemContainer({ index })}>
        <Text style={[styles.labelText, { color: color || colors.black, fontWeight: fontWeight }]}>{label}</Text>
        <View style={styles.valueContainer}>
          <Text style={[styles.currencyText, { color: color || colors.black, fontWeight: fontWeight }]}>USD</Text>
          <Text style={[styles.valueText, { color: color || colors.black, fontWeight: fontWeight }]}>{value}</Text>
        </View>
      </View>
    );
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList data={data} renderItem={summaryItem} />
    </View>
  );
};

export default Summary;
