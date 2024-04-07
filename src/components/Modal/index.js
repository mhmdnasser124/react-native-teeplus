import { Icon, Text } from "core/components";
import { Modal, TouchableOpacity, View } from "react-native";

import { BorderedButton } from "components";
import colors from "constants/colors";
import { memo } from "react";
import styles from "./styles";

const OptionsModal = ({ isVisible, iconStyle, onDismiss, onOption, onCancel, isLoading, withOptions = true, showCancel = true, label, labelStyle, labelColor, description, optionLabel, optionButtonStyle, icon }) => {
  return (
    <Modal coverScreen visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.topSection}>
            <Text style={[styles.title({ labelColor }), labelStyle]}>{label}</Text>
            <Icon name={icon} style={[styles.icon, iconStyle]} />
          </View>
          <View style={styles.bottomSection}>
            <View style={{ paddingHorizontal: 15, alignItems: "center" }}>
              <Text style={styles.text}>{description}</Text>
            </View>
            {!!withOptions && (
              <View style={styles.buttonContainer}>
                {showCancel && <BorderedButton onPress={onCancel} buttonStyle={[styles.button(), { marginRight: 10 }]} title="common.cancel" textStyle={styles.buttonText(colors.primary)} />}
                <BorderedButton isLoading={isLoading} onPress={onOption} buttonStyle={[styles.button(colors.crimsonCoral), optionButtonStyle]} title={optionLabel} textStyle={styles.buttonText()} />
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Icon fill="#1C1B1F" name={"cancel"} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(OptionsModal);
