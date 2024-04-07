import { StyleSheet } from "react-native";
import colors from "constants/colors";

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
  },
  text: {
    color: colors.black,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15,
  },
});

export default styles;
