import { StackActions } from "@react-navigation/native";
import * as React from "react";
const navigationRef = React.createRef();
const navigate = (name, data) => {
  
  const params = data?.params;
  if (navigationRef.current) navigationRef.current.navigate(name, params);
};
const replace = (name, data) => {
  const params = data?.params;
  if (navigationRef.current) {
    navigationRef.current.goBack();
    navigationRef.current.navigate(name, params);
  }
};
// const reset = (routeName, params) => navigationRef.current.dispatch(CommonActions.reset({ index: 1, routes: [{ name: routeName, params }] }));
const goBack = () => navigationRef.current.goBack();
const push = (routeName, data) => {
  const params = data?.params;
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}


const currentRoute = () => navigationRef.current.getCurrentRoute()?.name;
const getActiveRoute = (state) => {
  if (!state) return null;
  const route = state.routes[state.index];
  if (route.state) return getActiveRoute(route.state);
  return route;
};
const getActiveRouteName = (state) => {
  if (!state) return null;
  const route = state.routes[state.index];
  if (route.state) return getActiveRouteName(route.state);
  return route.name;
};
const goToTop = () => {
  while (navigationRef?.current?.canGoBack()) {
    navigationRef?.current?.goBack();
  }
};
const reset = (routeName, params) =>  navigationRef?.current?.reset({
  index: 0,
  routes: [{ name: routeName, params } ],
});
const getState = () => navigationRef?.current?.getState?.();
export { navigationRef, navigate, replace, reset, goBack, currentRoute, getActiveRouteName, goToTop, getState,push,getActiveRoute };