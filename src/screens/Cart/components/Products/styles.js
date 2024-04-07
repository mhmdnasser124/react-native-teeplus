import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";

const styles = StyleSheet.create({
  container: {},
  productContainer: ({ index }) => ({
    marginTop: index == 0 ? 0 : 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.paleGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
  }),
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: "white",
    borderRadius: 13,
  },
  productImage: {
    width: 70,
    height: 75,
    borderRadius: 5,
  },
  detailsContainer: {
    marginLeft: 12,
    width: "100%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: colors.black,
    fontFamily: getFontFamily("primary", 600),
    letterSpacing: 0.7,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    marginTop: 10,
    color: colors.mediumGray,
    fontFamily: getFontFamily("secondary", 700),
    color: colors.black,
  },
  currencyText: {
    color: colors.mediumGray,
    fontFamily: getFontFamily("primary", 600),
    marginLeft: 3,
  },
});

export default styles;
