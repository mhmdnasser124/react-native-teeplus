import { I18nManager, StyleSheet, View } from "react-native";

const RTLWrapper = ({ children }) => {
  const isRTL = I18nManager.isRTL;

  return <View style={[styles.container, isRTL && styles.rtlContainer]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rtlContainer: {
    flexDirection: "row-reverse",
  },
  // other styles...
});
export default RTLWrapper;
