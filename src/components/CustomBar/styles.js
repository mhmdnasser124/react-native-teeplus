import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import { w } from "utils/responsive";

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
    width: w(65),
  },

  labelText: ({ isFocused }) => ({
    marginTop: 5,
    fontSize: 12,
    fontFamily: getFontFamily("primary", 400),
    fontWeight: isFocused ? "bold" : null,
    color: isFocused ? colors.primary : colors.graphiteGray,
  }),
});

export default styles;
