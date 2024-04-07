import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontFamily: getFontFamily("primary", 600),
    fontWeight: "bold",
  },
});

export default styles;
