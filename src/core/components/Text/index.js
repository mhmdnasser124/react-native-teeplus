import { I18nManager, Text as Txt } from "react-native";
import { getConfigProps, getStyles, mergeProps } from "core/utils/component";
import { isEmpty, isWholeNumber } from "../../utils/helpers";

import React from "react";
import { useLocalization } from "../../providers";

const Text = (propsData) => {
  const { translate: t } = useLocalization();
  const props = mergeProps(propsData, getConfigProps("Text"));

  var { translate, style, placeholder, children, ...restProps } = props;
  var { fontFamily, fontFamilyText, fontFamilyNumber } = style;

  const getFont = (textType) => {
    if (isEmpty(fontFamily))
      if (textType == "number") return { fontFamily: fontFamilyNumber };
      else return { fontFamily: fontFamilyText };
  };
  const getWords = () => {
    var words = [];

    if (Array.isArray(children)) {
      children.map((data) => {
        if (!isEmpty(data)) words.push(...data?.toString?.()?.split?.(" "));
      });
    } else words = children?.toString?.().split?.(" ");
    return words;
  };
  const words = getWords();
  return (
    <Txt {...restProps} style={{ ...(I18nManager.isRTL && { textAlign: "left" }), ...style }}>
      {words?.map?.((word, index) => (
        <Txt key={index} {...restProps} style={getFont(isWholeNumber(word) ? "number" : "text")}>
          {translate ? t(word) : word}
          {index == words.length - 1 ? "" : " "}
        </Txt>
      ))}
    </Txt>
  );
};

export default Text;
