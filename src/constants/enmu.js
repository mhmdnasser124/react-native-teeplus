export const dictionary = {
  en: "en-US",
  ar: "ar-AR",
};

export const platforms = {
  ios: 1,
  android: 2,
};

export const extensionToMIME = {
  // Text
  txt: "text/plain",
  csv: "text/csv",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  xml: "application/xml",

  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",

  // Audio
  mp3: "audio/mpeg",
  ogg: "audio/ogg",
  wav: "audio/wav",

  // Video
  mp4: "video/mp4",
  webm: "video/webm",
  avi: "video/x-msvideo",
  mov: "video/quicktime",

  // Documents
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // Archives
  zip: "application/zip",
  tar: "application/x-tar",
  gz: "application/gzip",

  // Miscellaneous
  exe: "application/x-msdownload",
  apk: "application/vnd.android.package-archive",
};

export const notificationIcons = {
  error: "notificationError",
  success: "notificationCheck",
  warning: "notificationCheck",
};

export const userTypesEnum = {
  none: 0,
  guest: 1,
  registered: 2,
};
