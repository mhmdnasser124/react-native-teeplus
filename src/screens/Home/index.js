import { Categories, Cover, Products, StickyHeader } from "./components";

import { Header } from "components";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import styles from "./styles";
import { useState } from "core/hooks";

const Home = () => {
  const [state, setState] = useState({
    initState: {
      queries: {
        category_id: null,
      },
    },
  });
  const { queries } = state;
  const updateQueries = (data) => setState({ queries: { ...queries, ...data } });
  const topLayoutRef = React.useRef(0);
  const scrollRef = React.useRef();
  const scrollToProductsSection = () => scrollRef.current.scrollTo({ y: topLayoutRef.current.height, animated: true });

  return (
    <View style={styles.container}>
      <Header label={"teeplus"} showBack={false} />
      <ScrollView ref={(ref) => (scrollRef.current = ref)} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        <Cover onLayout={(layout) => (topLayoutRef.current = layout.nativeEvent.layout)} onPress={scrollToProductsSection} />
        <StickyHeader stickyEnabled={false} title={"home.allProducts"}>
          <Categories onChange={(category_id) => updateQueries({ category_id })} categoriesIds={queries.category_id} />
        </StickyHeader>
        <Products queries={queries} onFetched={scrollToProductsSection} />
      </ScrollView>
    </View>
  );
};

export default Home;
