import { Platform, StyleSheet } from "react-native";

import DeviceInfo from "react-native-device-info";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import { hp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? 16 : DeviceInfo.hasNotch() ? hp(24) : 0,
  },
  backButton: {
    flex: 1,
    height: 24,
    alignItems: "flex-start",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 20,
    fontFamily: getFontFamily("primary", 800),
    fontWeight: "bold",
  },
  rightComponent: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default styles;
