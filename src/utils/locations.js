import * as turf from "@turf/turf";

import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, check, request } from "react-native-permissions";
import { isLocationEnabled, promptForEnableLocationIfNeeded } from "react-native-android-location-enabler";

import Geolocation from "react-native-geolocation-service";

export const GetCurrentPosition = async (onSuccess, onFailure) => {
  locationPermission(() => {
    Geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        onSuccess && onSuccess({ latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 });
      },
      async (err) => {
        onFailure?.({ message: "validatorsMessage.gps" });
        await requestPermissions();
      },
      {
        timeout: 15000,
        distanceFilter: 10,
        showLocationDialog: true,
        fastestInterval: 1000,
        interval: 2000,
        maximumAge: 3600000,
        enableHighAccuracy: false,
        useSignificantChanges: false,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  }, onFailure);
};

const openSettings = ({ onFailure }) => {
  if (Platform.OS == "ios") {
    onFailure?.({ message: "validatorsMessage.gps" });
    setTimeout(() => Linking.openSettings(), 1000);
  }
};

export const locationPermission = async (onSuccess, onFailure) => {
  if (Platform.OS == "android") {
    const isGPS = await isLocationEnabled();
    if (!isGPS) {
      onFailure?.({ message: "validatorsMessage.gps" });
      await promptForEnableLocationIfNeeded();
    }
  }
  const PermissionName = Platform.select({ android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE });
  check(PermissionName).then((result) => {
    if (result == "blocked" /*ios: settings: never*/) openSettings({ onFailure });
    if (result == "granted" /*ios: settings: while using the app*/) onSuccess && onSuccess();
    if (result == "denied" /*ios: settings: ask next time or when i share || android: settings disable location*/) {
      request(PermissionName)
        .then((value) => {
          if (value == "denied") onFailure?.({ message: "validatorsMessage.gps" }); // android: popup press deny
          if (value == "blocked") onFailure?.({ message: "validatorsMessage.gps" });
          if (value == "granted") onSuccess && onSuccess(); // ios: popup: one time , while using the app || android: popup press allow
        })
        .catch((error) => {
          onFailure?.({ message: "validatorsMessage.gps" });
        });
    }
  });
};

export async function requestPermissions() {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
}

export const isPointInsidePolygon = (point, polygon) => {
  const turfPoint = turf.point(point.reverse()).geometry;
  const turfPolygon = turf.polygon([polygon]).geometry;
  const result = turf.booleanPointInPolygon(turfPoint, turfPolygon);
  return result;
};

export const getFormattedAddress = ({ results }) => {
  let country, city, area, street;
  for (const result of results) {
    for (const component of result.address_components) {
      const types = component.types;
      if (types.includes("country")) {
        country = component.long_name;
      } else if (types.includes("locality")) {
        city = component.long_name;
      } else if (types.includes("sublocality")) {
        area = component.long_name;
      } else if (types.includes("route")) {
        street = component.long_name;
      }
    }
  }
  const locationInfo = {
    country,
    city,
    area,
    street,
  };

  let locationArray = [country, city, area, street].reverse();
  let locationString = locationArray.filter((val) => !!val).join(", ");

  return { locationInfo, locationString };
};

export const extractLocationInfo = (formattedAddress) => {
  const addressComponents = formattedAddress.split(", ");
  const [street, area, city, country] = addressComponents;
  return {
    country,
    city,
    area,
    street,
  };
};

export const getDistanceBetween2Points = (coordinates1, coordinates2) => {
  const turf = require("@turf/turf");

  // Define the coordinates of the two locations
  const point1 = turf.point([coordinates1.longitude, coordinates1.latitude]); // [longitude, latitude]
  const point2 = turf.point([coordinates2.longitude, coordinates2.latitude]); // [longitude, latitude]

  // Calculate the distance between the two points in kilometers
  const options = { units: "meters" };
  const distance = turf.distance(point1, point2, options);

  return distance;
};

export const OpenGoogleMaps = (latitude, longitude) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${latitude},${longitude}`;
  const label = "location";
  const url = Platform.select({ ios: `${scheme}${label}@${latLng}`, android: `${scheme}${latLng}(${label})` });
  Linking.openURL(url);
};

export const findClosestLocation = (currentLocation, locations) => {
  const from = turf.point([currentLocation.longitude, currentLocation.latitude]);
  let closestDistance = 300; // 300 meters threshold
  let closestLocation = null;

  locations.forEach((location) => {
    const to = turf.point([location.longitude, location.latitude]);
    const options = { units: "meters" };
    const distance = turf.distance(from, to, options);
    console.log("distance", distance);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestLocation = location;
    }
  });

  return { closestLocation, closestDistance };
};
