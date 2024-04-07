import { Dimensions, StyleSheet } from "react-native";
import { h, w } from "utils/responsive";

import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.22,
  },

  title: {
    color: colors.black,
    fontSize: 12,
    fontFamily: getFontFamily("primary", 600),
    fontWeight: "bold",
  },
  currency: {
    color: colors.black,
    fontSize: 14,
    marginTop: 5,
    fontFamily: getFontFamily("primary", 400),
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default styles;
