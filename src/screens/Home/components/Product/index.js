import { Image, Text } from "core/components";

import AppActions from "reduxApp/actions/app";
import { Pressable } from "react-native";
import React from "react";
import { navigate } from "core/navigations/actions";
import styles from "./styles";
import { useDispatch } from "react-redux";

const Item = (product) => {
  const { image, title, currency } = product;
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(AppActions.setUserData({ currentProduct: product }));
        navigate("Design", { params: { name: title } });
      }}
      style={{ paddingHorizontal: 10, width: "50%" }}
    >
      <Image resizeMode={"contain"} style={styles.image} source={{ uri: image }} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.currency} numberOfLines={1}>
        {currency}
      </Text>
    </Pressable>
  );
};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
