import DeviceInfo from "react-native-device-info";
export default {
  name: "teeplus",
  facebook: {
    appId: "",
  },
  appCenter: {
    codePushRepos: {
      ios: {
        link: "",
      },
      android: {
        link: "",
      },
    },
  },
  version: {
    android: DeviceInfo.getVersion(),
    ios: DeviceInfo.getVersion(),
    web: "1.0.0",
  },
  cache: {
    isEnabled: true,
  },
  deviceRatio: {
    deviceWidth: 394,
    deviceHeight: 852,
  },
  googleMap: {
    key: "",
    searchKey: "",
  },
  network: {
    isEnabled: true,
  },
  serviceBus: {
    connectionString: "",
  },
  url: {
    api: "https://api.printful.com",
  },
  api: {
    timeout: 100 * 1000,
  },
  headers: {
    "Content-Type": "application/json",
  },
  firebaseCloudMessaging: {},
  appLinks: {
    ios: "",
    android: "",
  },
  termsAndConditions: {
    ar: "",
    en: "",
  },
};
