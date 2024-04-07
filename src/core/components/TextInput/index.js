import { I18nManager, TextInput as TI } from "react-native";
import { getConfigProps, mergeProps, textInputsMask } from "core/utils/component";

import React from "react";
import { isEmpty } from "core/utils/helpers";
import { useLocalization } from "../../providers";

const TextInput = (propsData) => {
  const { translate: t } = useLocalization();
  const props = mergeProps(propsData, getConfigProps("TextInput"));
  var { translate, value, style, onChange, placeholder, placeholderStyle, ...restProps } = props;
  const styles = () => {
    if (!!value) return style;
    else {
      if (!isEmpty(placeholderStyle)) return { ...style, ...placeholderStyle };
      else return style;
    }
  };
  return (
    <TI
      value={props?.mask?.effect == "view" ? textInputsMask[props.mask.type].converter(value) : value}
      onChangeText={(value) => onChange(!!props.mask ? textInputsMask[props.mask.type].reverser(value) : value)}
      placeholderTextColor={placeholderStyle?.color}
      {...restProps}
      style={{
        ...(I18nManager.isRTL && {
          textAlign: "right",
        }),
        ...styles(),
      }}
      placeholder={translate ? t(placeholder) : placeholder}
    />
  );
};

export default TextInput;

TextInput.defaultProps = {
  translate: true,
};
