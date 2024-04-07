import { Dimensions } from "react-native";
import configs from "configs/env";

const { deviceWidth, deviceHeight } = configs.deviceRatio;
const { width: screenWidth, height: screenHight } = Dimensions.get("window");

export const getHeight = (width, height) => width / (width / height);
export const getAspectRatio = (width, height) => width / height;

export const getRationPercentage = (low, high) => `${(low / high) * 100}%`;

export const wp = (width) => `${(width / deviceWidth) * 100}%`;
export const hp = (height) => `${(height / deviceHeight) * 100}%`;
export const hpRatio = (height, baseheight) => `${(height / baseheight) * 100}%`;
export const wpRatio = (width, baseWidth) => `${(width / baseWidth) * 100}%`;

export const w = (width) => screenWidth * (width / deviceWidth);

export const aspectRatio = (width, hight) => width / hight;

export const h = (height) => w(1) / aspectRatio(1, height);

export const wpd = (percentage) => Math.round((percentage * screenWidth) / 100);
