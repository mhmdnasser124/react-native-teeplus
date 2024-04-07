export const isUserType = (userType) => {
  const { store } = require("reduxApp/store");
  const type = store.getState().app.userData.userType;
  return type == userType;
};
