import { h, hp, hpRatio, w } from "utils/responsive";

import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backdropTransparent,
  },
  modal: {
    width: w(361),
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: "hidden",
  },
  topSection: {
    width: "100%",
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: ({ labelColor }) => ({
    color: labelColor || colors.crimsonCoral,
    fontFamily: getFontFamily("primary", 700),
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "center",
    letterSpacing: 1,
  }),
  icon: {
    width: w(165),
    height: h(135, 139.011),
    marginVertical: 10,
  },
  bottomSection: {
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 15,
  },
  button: (color) => ({
    paddingVertical: 13,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    borderColor: color || colors.primary,
    backgroundColor: color || colors.white,
  }),
  buttonText: (color) => ({
    color: color || colors.white,
    fontFamily: getFontFamily("primary", 600),
    fontSize: 14,
    letterSpacing: 0.7,
  }),
  closeButton: {
    position: "absolute",
    top: 12,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  text: {
    color: colors.black,
    textAlign: "center",
    fontFamily: getFontFamily("primary", 600),
    fontSize: 14,
    letterSpacing: 0.7,
  },
});

export default styles;
