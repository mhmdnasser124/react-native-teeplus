import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: ({ disabled, enabledButtonColor }) => ({
    backgroundColor: disabled ? colors.mediumGray : enabledButtonColor,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  }),
  text: ({ disabled, enabledTextColor }) => ({
    color: disabled ? colors.white : enabledTextColor,
    fontSize: 20,
    fontFamily: getFontFamily("primary", 600),
    letterSpacing: 1,
    lineHeight: 22,
  }),
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default styles;
