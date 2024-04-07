import { h, w } from "utils/responsive";

export const skeletonConfig = [
  {
    count: 4,
    style: {
      width: w(170),
      height: h(250),
      marginTop: w(17),
      borderRadius: 8,
    },
    containerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: w(17),
    },
  },
];
