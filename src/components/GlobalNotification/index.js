import { Icon, Text } from "core/components";
import { Pressable, SafeAreaView, View } from "react-native";
import React, { useCallback, useEffect } from "react";

import LinearGradient from "react-native-linear-gradient";
import { animatedInEaseOut } from "core/utils/helpers";
import styles from "./styles";
import { useGlobalNotifications } from "core/providers";

const NotificationHandler = () => {
  const { globalNotifications, setGlobalNotifications } = useGlobalNotifications();
  const reset = useCallback(() => setGlobalNotifications({ ...globalNotifications, isShow: false, title: "", message: "", color: "" }), []);
  useEffect(() => {
    animatedInEaseOut();
    if (globalNotifications?.isShow) setTimeout(reset, 2000);
  }, [globalNotifications?.isShow]);

  if (!globalNotifications?.isShow) return null;

  return (
    <LinearGradient colors={globalNotifications?.color} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container(globalNotifications?.borderColor)}>
      <Icon isRtl={false} name={globalNotifications?.icon} style={styles.icon} />
      <Text style={styles.notificationText}>{globalNotifications?.message}</Text>
      <Pressable onPress={reset}>
        <Icon isRtl={false} name={"notificationClose"} style={styles.icon} />
      </Pressable>
    </LinearGradient>
  );
};

export default NotificationHandler;
