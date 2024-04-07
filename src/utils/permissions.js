import { Platform } from "react-native";
import { requestTrackingPermission } from "react-native-tracking-transparency";

export const requestTrackingAppPermission = async () => {
  if (Platform.OS === "ios") {
    try {
      const status = await requestTrackingPermission();
      console.log("status", status);
    } catch (e) {
      console.log("e", e);
    }
  }
};
