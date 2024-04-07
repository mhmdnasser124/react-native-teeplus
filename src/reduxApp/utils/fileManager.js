import { IntentLauncherAndroid, Linking, Platform } from "react-native";

import ReactNativeBlobUtil from "react-native-blob-util";
import constants from "configs/env";
import { extensionToMIME } from "constants/enmu";

export const openDocument = (filePath) => {
  if (!filePath) {
    return;
  }

  const extension = filePath.split(".").pop().toLowerCase();
  const mime = extensionToMIME[extension] || "application/*";
  if (Platform.OS === "ios") {
    Linking.openURL(`file://${filePath}`);
  } else if (Platform.OS === "android") {
    IntentLauncherAndroid.startActivityAsync("android.intent.action.VIEW", {
      data: `file://${filePath}`,
      type: mime,
    }).catch((error) => {
      console.error("Error opening document: ", error);
    });
  }
};

export const getDownloadConfigs = (folderType, fileUrl) => {
  const { name: appName } = constants;

  const {
    dirs: { DownloadDir, DocumentDir },
  } = ReactNativeBlobUtil.fs;

  const directoryPath = Platform.select({
    ios: DocumentDir,
    android: DownloadDir,
  });

  const regExp = /\/|<|>|\*|"|:|\?|\\|\|/g;
  const [fileName, extension] = fileUrl.split("/").pop().split(".");
  const downloadedName = fileName.replace(regExp, "_");
  const iosFilePath = `${directoryPath}/${appName}/${folderType}/${downloadedName}.${extension}`;
  const Androidpath = `${directoryPath}/${downloadedName}.${extension}`;

  const configOptions = Platform.select({
    ios: {
      path: iosFilePath,
      appendExt: "",
      notification: true,
      IOSBackgroundTask: true,
      background: true,
    },
    android: {
      path: Androidpath,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        addAndroidDownloads: true,
        path: Androidpath,
      },
    },
  });

  return {
    configOptions,
    downloadPath: Platform.select({
      ios: iosFilePath,
      android: Androidpath,
    }),
  };
};
