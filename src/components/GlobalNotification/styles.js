import { StyleSheet } from "react-native";
import colors from "constants/colors";

const styles = StyleSheet.create({
  container: (borderColor) => ({
    position: "absolute",
    borderRadius: 12,
    top: 50,
    borderColor: borderColor,
    borderWidth: 1,
    width: "93%",
    alignSelf: "center",
    zIndex: 100000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  }),

  notificationText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "left",
    alignSelf: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginEnd: 10,
  },
});

export default styles;
