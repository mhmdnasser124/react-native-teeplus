import { DynamicSkeleton, HorizontalSelector } from "components";

import EntityWrapper from "reduxApp/utils/EntityWrapper";
import React from "react";
import { View } from "react-native";
import colors from "constants/colors";
import productsService from "services/products";
import { shadow } from "constants/themes";
import { skeletonConfigCategories } from "./data";

const Categories = ({ onChange, categoriesIds }) => {
  return (
    <View>
      <EntityWrapper
        endpoint={productsService.getCategories}
        methodType={"GET"}
        renderItem={({
          data: {
            result: { categories },
          },
        }) => <HorizontalSelector data={categories.slice(0, 5)} mainColor={colors.primary} onChange={onChange} value={categoriesIds} containerStyle={{ paddingTop: 10, paddingBottom: 10, borderRadius: 10 }} />}
        renderLoading={() => <DynamicSkeleton isLoading={true} config={skeletonConfigCategories} />}
      />
    </View>
  );
};

export default Categories;
