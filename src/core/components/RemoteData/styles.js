const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  listContainer: (flex) =>({
    flex: flex,
  }),
  loading: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;