import { FlatList, View } from "react-native";
import { Image, Text } from "core/components";

import AppActions from "reduxApp/actions/app";
import ProductQuantityPicker from "../ProductQuantityPicker";
import React from "react";
import { getFontFamily } from "utils/helpers";
import styles from "./styles";
import { useDispatch } from "react-redux";

const Products = ({ containerStyle, data, mainColor, onRefresh, onClearCart, onChangeLoading }) => {
  const dispatch = useDispatch();

  const updateQuantity = (quantity, id) => {
    if (quantity > 0) {
      onChangeLoading(true);
      setTimeout(() => {
        dispatch(AppActions.updateBasketById({ cartId: id, count: quantity }));
        onChangeLoading(false);
        !!onRefresh && onRefresh();
      }, 1500);
    } else {
      if (data.length == 1) onClearCart();
      else {
        onChangeLoading(false);
        dispatch(AppActions.removeFromBasket({ cartId: id }));
        !!onRefresh && onRefresh();
      }
    }
  };

  const productItem = ({ item: { name, price, count, imageURL, options, cartId, maxQty }, index }) => (
    <>
      <View style={styles.productContainer({ index })}>
        <View style={styles.leftSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.productImage} source={{ uri: imageURL }} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text numberOfLines={1} translate={false} style={styles.productName}>
                {name}
              </Text>
            </View>
            <View style={{ width: "60%" }}>
              {options?.length > 0 &&
                options.map(({ key, value }, index) => (
                  <Text numberOfLines={1} style={{ color: mainColor, marginTop: 5, fontSize: 12, fontFamily: getFontFamily("primary", 500) }}>
                    {key + ": " + value}
                  </Text>
                ))}
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                USD
                {price}
              </Text>
            </View>
          </View>
        </View>

        <ProductQuantityPicker maxValue={maxQty} minValue={0} withDebounce mainColor={mainColor} value={count} onChange={(quantity) => updateQuantity(quantity, cartId)} />
      </View>
    </>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList data={data} renderItem={productItem} keyExtractor={(item) => item?.Id?.toString()} />
    </View>
  );
};

export default Products;
