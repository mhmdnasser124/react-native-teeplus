import { FlatList, View } from "react-native";
import React, { useCallback } from "react";

import { DynamicSkeleton } from "components";
import EntityWrapper from "reduxApp/utils/EntityWrapper";
import Product from "../Product";
import productsService from "services/products";
import { skeletonConfig } from "./data";
import styles from "./styles";

const Products = ({ queries, onFetched }) => {
  const keyExtractor = useCallback((item) => item.id, []);

  const renderItem = ({ item }) => <Product {...item} />;

  return (
    <View>
      <EntityWrapper
        endpoint={productsService.getProducts}
        queries={queries}
        methodType={"GET"}
        onSuccess={!!queries?.category_id && onFetched}
        renderItem={({ data: { result } }) =>
          result?.length > 0 && (
            <View style={styles.container}>
              <FlatList
                keyExtractor={keyExtractor}
                data={result}
                numColumns={2}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />}
                renderItem={renderItem}
              />
            </View>
          )
        }
        renderLoading={() => <DynamicSkeleton isLoading={true} config={skeletonConfig} />}
      />
    </View>
  );
};

export default Products;
