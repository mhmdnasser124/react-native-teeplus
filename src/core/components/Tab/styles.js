import { defaultTheme } from "Assets/theme";

export default styles = {
  flatlist: { paddingLeft: 15, paddingRight: 15 },
  line: {
    backgroundColor: "black",
    height: 2.5,
    position: "absolute",
    left: 6,
    right: 6,
  },
  top: { top: 0 },
  bottom: { bottom: 0 },
  tab: {
    padding: 10,
    marginRight: 5,
    // backgroundColor:'red',
  },
  label: (selected, color) => ({
    fontSize: defaultTheme.font.s7,

    color: selected ? color || "black" : defaultTheme.gray,
    // fontWeight: 'bold',
    textAlign: "center",
  }),
  bar: {
    height: 1,
    backgroundColor: defaultTheme.border,
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
  },
  icon: { paddingRight: 8, color: defaultTheme.primary },
  svg: { marginRight: 0 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
