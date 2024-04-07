import { I18nManager, StyleSheet } from "react-native";
import { getAspectRatio, h } from "utils/responsive";

import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import { wdp } from "react-native-shbib-tools/utils/helpers";

const styles = StyleSheet.create({
  container: {
    width: wdp(100),
    height: h(190, 394),
    backgroundColor: colors.primary,
  },
  image: {
    aspectRatio: getAspectRatio(166, 234),
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  textContainer: {
    flex: 1,
    marginStart: 16,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingBottom: 20,
  },
  welcomeText: {
    color: colors.white,
    fontSize: 35,
    fontFamily: getFontFamily("primary", 600),
  },
  userName: {
    color: colors.white,
    fontSize: 42,

    fontFamily: getFontFamily("primary", 600),
  },
  discountText: {
    color: colors.white,
    fontSize: 18,

    marginTop: 12,
  },
  mastercardText: {
    color: colors.sapphireBlue,
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.sapphireBlue,
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,

    letterSpacing: 0.28,
  },
});
export default styles;
