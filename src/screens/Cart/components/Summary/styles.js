import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleText: {
    marginBottom: 12,
    fontFamily: getFontFamily("primary", 400),
  },
  itemContainer: ({ index }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: index == 0 ? 0 : 16,
  }),
  labelText: {
    fontSize: 16,
    fontFamily: getFontFamily("primary", 400),
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyText: {
    fontSize: 14,
    letterSpacing: 0.7,
    fontFamily: getFontFamily("primary", 600),
  },
  valueText: {
    fontSize: 14,
    fontFamily: getFontFamily("secondary", 600),
    marginLeft: 5,
  },
});

export default styles;
