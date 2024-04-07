import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  rtlQuantityButtonPlus: {
    marginEnd: 6,
  },
  rtlQuantityButtonMinus: {
    marginStart: 6,
  },
  ltrQuantityButtonPlus: {
    marginStart: 6,
  },
  ltrQuantityButtonMinus: {
    marginEnd: 6,
  },
  icon: {
    width: 20,
    height: 20,
  },
  quantityText: ({ mainColor }) => ({
    color: mainColor || colors.aquaMarine,
    fontSize: 14,
    fontFamilyNumber: getFontFamily("secondary", 600),
  }),
});

export default styles;
