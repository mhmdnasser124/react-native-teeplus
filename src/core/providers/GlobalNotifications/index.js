import React, { createContext, useContext } from "react";

import { useLayoutEffect } from "react";
import { useState } from "core/hooks";

export let GLOBAL_NOTIFICATIONS__INITIAL_STATE = {
  isShow: "",
};

export var setNotification = () => null;

export const GlobalNotificationProviderContext = createContext(GLOBAL_NOTIFICATIONS__INITIAL_STATE);
export const useGlobalNotifications = () => useContext(GlobalNotificationProviderContext);
export function GlobalNotificationsProvider({ children }) {
  const [globalNotifications, setGlobalNotifications] = useState({
    initState: GLOBAL_NOTIFICATIONS__INITIAL_STATE,
  });
  useLayoutEffect(() => {
    setNotification = (newData) => setGlobalNotifications({ ...globalNotifications, ...newData });
  }, [globalNotifications]);
  return <GlobalNotificationProviderContext.Provider value={{ globalNotifications, setGlobalNotifications }}>{children}</GlobalNotificationProviderContext.Provider>;
}
