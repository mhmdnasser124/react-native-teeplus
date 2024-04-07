import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const KeyboardWrapper = ({ children, offset, refrance, bounces = true, style }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white", ...style }} behavior={Platform.OS == "ios" ? "padding" : null} keyboardVerticalOffset={offset || 90}>
      <ScrollView nested={false} ref={refrance} bounces={bounces} contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
