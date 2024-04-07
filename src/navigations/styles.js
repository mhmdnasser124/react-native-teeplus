const { default: colors } = require("constants/colors");
const { StyleSheet, Platform } = require("react-native");

var styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "transparent",
  },
  tabBar: {
    paddingBottom: Platform.OS == "android" ? 0 : 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default styles;
