import { I18nManager, NativeModules, Platform } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";

const LocalizationContext = createContext();
export const useLocalization = () => useContext(LocalizationContext);
export var getCurrentLanguage=null
export const LocalizationProvider = ({ children, translations }) => {
  const [currentLanguage, setLanguage] = useState();
 
  const getSystemLocale = () => {
    let locale;
    if (Platform.OS === 'ios') locale = NativeModules?.SettingsManager?.settings?.AppleLanguages?.[0]
    else if (Platform.OS === 'android') locale = NativeModules?.I18nManager?.localeIdentifier;
    return !!locale ? locale.split?.(/[-_]/)?.[0] : 'en';
  }
  useEffect(() => {
    async function loadStoredLanguage() {
      try {
        const storedLanguage = await AsyncStorage.getItem(translations.storageKey);
        if (storedLanguage) changeLanguage(storedLanguage)
        else changeLanguage(translations?.default === "device" ? getSystemLocale() : translations?.default)
      } catch (error) {
        console.log('error',error)

        console.error("Error loading stored language:", error);
      } 
    }
    loadStoredLanguage();
  }, []);
  const translate = (key) => {
    if (!key?.includes?.(".")) return key;
    const keys = key?.split?.(".");
    let translation = translations.languages.find(({ code }) => currentLanguage == code)?.data;
    for (const k of keys) {
      if (translation && translation[k]) translation = translation[k];
      else {
        translation = key;
        break;
      }
    }
    return translation;
  };
  const changeLanguage = async (code) => {

    setLanguage(code);
    getCurrentLanguage = code;
    const { direction } = translations.languages.find((item) => item.code == code);
    try {
       AsyncStorage.setItem(translations.storageKey, code).then(()=>{
        if (direction == "rtl" && !!I18nManager?.isRTL||direction == "ltr" && !!!I18nManager?.isRTL) {
        } else {
          I18nManager.allowRTL(direction == "rtl");
          I18nManager.forceRTL(direction == "rtl");
          setTimeout(() => RNRestart.Restart(), 500);
        }
       })
    } catch (error) {
      console.log("Error storing selected language:", error);
    }
  };
  return <LocalizationContext.Provider value={{ currentLanguage, changeLanguage, translate }}>{!!currentLanguage&&children}</LocalizationContext.Provider>;
};