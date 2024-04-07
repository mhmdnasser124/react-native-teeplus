import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: {},
  headerText: {
    marginBottom: 12,
    color: colors.black,
    fontSize: 18,
    fontFamily: getFontFamily("primary", 500),
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontFamily: getFontFamily("primary", 600),
    fontSize: 14,
  },
  applyButton: (mainColor, disabled) => ({
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 15,
    borderRadius: 15,
    backgroundColor: disabled ? colors.mediumGray : mainColor,
  }),
  applyButtonText: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: 0.32,
    lineHeight: 19,
    fontFamily: getFontFamily("primary", 500),
  },
});

export default styles;
