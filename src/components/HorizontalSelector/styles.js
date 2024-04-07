import { StyleSheet } from "react-native";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import { shadow } from "constants/themes";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  categoryItem: ({ isFirstItem, isSelected, mainColor }) => ({
    backgroundColor: isSelected ? mainColor : colors.white,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: isFirstItem ? 10 : 0,
    ...shadow.center,
  }),
  categoryIcon: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: 18,
    height: 18,
  },
  categoryIconStyle: {
    width: 18,
    height: 18,
  },
  categoryText: ({ isSelected }) => ({
    marginLeft: 8,
    color: isSelected ? colors.white : colors.midnightCharcoal,
    fontSize: 12,
    fontFamily: getFontFamily("primary", 400),
  }),
});

export default styles;
