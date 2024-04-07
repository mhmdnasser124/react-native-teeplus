import { Cart, Design, Home, Startup } from "screens";

import { CustomBar } from "components";
import React from "react";
import { StatusBar } from "core/components";
import { TabBar } from "core/navigations/component";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styles from "./styles";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const { isStartup } = useSelector((state) => state.app);

  return (
    <Stack.Navigator>
      {!isStartup && <Stack.Screen name="Startup" component={Startup} options={{ headerShown: false }} />}
      {isStartup && <Stack.Screen name="AllScreens" component={allScreens} options={{ headerShown: false }} />}
    </Stack.Navigator>
  );
};

const allScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={tab} options={{ headerShown: false }} />
      <Stack.Screen name="Design" component={Design} options={{ headerShown: true, header: StatusBar }} />
    </Stack.Navigator>
  );
};

const tab = () => {
  const { basket } = useSelector((state) => state.app.userData);

  return (
    <Tab.Navigator
      screenOptions={{ unmountOnBlur: false, tabBarHideOnKeyboard: true, lazy: false, freezeOnBlur: true }}
      tabBar={(props) => <TabBar {...props} CustomBottomBar={CustomBar} containerStyle={styles.tabBarContainer} style={styles.tabBar} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: StatusBar,
          icon: {
            name: "homeUnselect",
            selectedName: "homeSelect",
            label: "bar.home",
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          header: StatusBar,
          icon: {
            count: basket?.length,
            name: "cartUnselect",
            selectedName: "cartSelect",
            label: "bar.cart",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationStack;
