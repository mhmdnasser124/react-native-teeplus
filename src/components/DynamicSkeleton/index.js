import { Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import colors from "constants/colors";

const DynamicSkeleton = ({ isLoading = true, config, children }) => {
  const [animation, setAnimation] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (isLoading) {
      const newAnimation = Animated.loop(
        Animated.sequence([Animated.timing(fadeAnim, { toValue: 1, duration: 300, easing: Easing.linear, useNativeDriver: true }), Animated.timing(fadeAnim, { toValue: 0.8, duration: 500, easing: Easing.linear, useNativeDriver: true })]),
      );
      newAnimation.start();
      setAnimation(newAnimation);

      return () => {
        newAnimation.stop();
        setAnimation(null);
      };
    }
  }, [isLoading, fadeAnim]);

  const renderSkeletonElements = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {config.map((shape, index) => {
          const { style, count = 1, containerStyle } = shape;
          return (
            <View key={index} style={containerStyle}>
              {[...Array(count)].map((_, i) => (
                <Animated.View key={"key-" + i} style={[styles.skeleton, style, { opacity: fadeAnim }]}>
                  <View style={styles.gradient} />
                </Animated.View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return isLoading ? renderSkeletonElements() : children;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#e6e3e2",
  },
});

export default DynamicSkeleton;
