import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "core/components";

import React from "react";
import colors from "constants/colors";
import { getFontFamily } from "utils/helpers";
import styles from "./styles";

const VoucherInput = ({ isApplied, containerStyle, voucherLoading, mainColor, value, onApply, onClearValue, onChange, info, isError }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.headerText}>cart.promoCode</Text>
      <View style={styles.inputContainer}>
        <TextInput value={value} onChange={(voucher) => onChange(voucher)} placeholder="cart.enterVoucherCode" placeholderTextColor="#8E8E8E" style={styles.input} />
        <TouchableOpacity disabled={!!!value} onPress={() => (!isApplied ? onApply() : onClearValue())} style={styles.applyButton(mainColor, !!!value)}>
          <View style={{ flexDirection: "row" }}>
            {!!voucherLoading && <ActivityIndicator style={{ marginEnd: 10 }} color={colors.white} />}
            <Text style={styles.applyButtonText}>{isApplied ? "common.delete" : "common.apply"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {!!info && <Text style={{ color: isError ? colors.crimsonCoral : mainColor, fontSize: 12, fontFamily: getFontFamily("secondary", 400), left: 10, marginTop: 12 }}>{info}</Text>}
    </View>
  );
};

export default VoucherInput;
