import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  clearText: {
    color: colors.crimsonCoral,
    fontSize: 16,
    textAlignVertical: "center",
    fontFamily: getFontFamily("primary", 400),
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: colors.white,
    paddingBottom: 10,
  },
  orderMethodContainer: {
    paddingHorizontal: 16,
  },
  specialRequestContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },

  voucherInputContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  summaryContainer: {
    marginTop: 10,
  },
  checkoutButton: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 32,
  },
  checkoutContent: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderWidth: 1.5,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    marginStart: 12,
  },
  checkoutLabel: {
    color: colors.primary,
    fontFamily: getFontFamily("primary", 700),
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default styles;
