import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontSize: 25,
    marginStart: 15,
    fontFamily: getFontFamily("primary", 600),
    fontWeight: "bold",
  },
});

export default styles;
