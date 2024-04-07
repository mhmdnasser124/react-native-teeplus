import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./stacks";
import React from "react";
import { navigationRef } from "core/navigations/actions";

export const AppNavigation = () => {
  return (
    <>
      <NavigationContainer theme={{ colors: { backgroundColor: "#fff" } }} ref={navigationRef}>
        <NavigationStack />
      </NavigationContainer>
    </>
  );
};
