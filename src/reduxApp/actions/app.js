import { createActions, createReducer } from "reduxsauce";
import { orderMethodsEnum, userTypesEnum } from "constants/enmu";

import Immutable from "seamless-immutable";
import { REHYDRATE } from "redux-persist";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions(
  {
    setUserData: ["data"],
    addToCache: ["data"],
    addToBasket: ["data"],
    updateBasketById: ["data"],
    removeFromBasket: ["data"],
    clearBasket: ["data"],
    setFirstTimeOpened: null,
    logout: null,
    setLanguage: ["language"],
    reset: null,
    resetApp: null,
    onStartupSucceeded: null,
    startup: null,
  },
  {
    prefix: "App/",
  },
);

export const AppTypes = Types;
export default Creators;
const initState = {
  isStartup: false,
  firstTime: true,
  userData: {
    isLoggedIn: false,
    Token: null,
    Address: [],
    selectedAddress: null,
    basket: [],
    currentProduct: null,
    userType: userTypesEnum.none,
  },
  cache: {
    data: {},
  },
};

export const INITIAL_STATE = Immutable(initState);

export const onStartupSucceeded = (state) => ({ ...state, isStartup: true });
export const setFirstTimeOpened = (state) => ({ ...state, firstTime: false });
export const setLanguage = (state, { language }) => ({ ...state, userData: { ...state.userData, language } });
export const setUserData = (state, { data }) => ({ ...state, userData: { ...state.userData, ...data } });
export const addToCache = (state, { data }) => ({ ...state, cache: { data: { ...state.cache.data, [data.key]: data.data } } });
export const reset = () => INITIAL_STATE;
export const resetApp = (state) => ({ ...state, isStartup: false });
export const logout = () => ({ ...INITIAL_STATE, isStartup: true });
export const rehydrate = (state, { payload }) => ({ ...state, ...payload?.app, isStartup: false });
export const addToBasket = (state, { data }) => ({ ...state, userData: { ...state.userData, basket: [...state.userData?.basket, data] } });
export const updateBasketById = (state, { data }) => ({
  ...state,
  userData: {
    ...state.userData,
    basket: state.userData.basket.map((item) => (item.cartId === data.cartId ? { ...item, count: data.count } : item)),
  },
});
export const removeFromBasket = (state, { data }) => ({
  ...state,
  userData: {
    ...state.userData,
    basket: state.userData?.basket.filter((item) => item.cartId !== data.cartId),
  },
});

export const clearBasket = (state) => ({ ...state, userData: { ...state.userData, basket: [] } });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT]: logout,
  [Types.ADD_TO_CACHE]: addToCache,
  [Types.ADD_TO_BASKET]: addToBasket,
  [Types.UPDATE_BASKET_BY_ID]: updateBasketById,
  [Types.REMOVE_FROM_BASKET]: removeFromBasket,
  [Types.CLEAR_BASKET]: clearBasket,
  [Types.SET_USER_DATA]: setUserData,
  [Types.SET_FIRST_TIME_OPENED]: setFirstTimeOpened,
  [Types.SET_LANGUAGE]: setLanguage,
  [Types.RESET]: reset,
  [Types.RESET_APP]: resetApp,
  [Types.ON_STARTUP_SUCCEEDED]: onStartupSucceeded,
  [REHYDRATE]: rehydrate,
});
