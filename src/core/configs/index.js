import React from "react";

export const libraryConfigs = React.createRef();

libraryConfigs.current = {
  license: "",
  components: {},
  sources: {},
  form: {
    fields: {},
    discardTriggerProps: ["onChangeProps", "onChange", "validatorMessage"],
    validatorsMessage: {
      isRequired: "validatorsMessage.isRequired",
      minLength: "validatorsMessage.minLength",
      maxLength: "validatorsMessage.maxLength",
      exactLength: "validatorsMessage.exactLength",
      isNumber: "validatorsMessage.isNumber",
      isMatches: "validatorsMessage.isMatches",
      isEmailAddress: "validatorsMessage.isEmailAddress",
      isMobileNumber: "validatorsMessage.isMobileNumber",
      isIpAddress: "validatorsMessage.isIpAddress",
      isPort: "validatorsMessage.isPort",
      isInteger: "validatorsMessage.isInteger",
    },
  },
};

export const setComponentsConfig = (components) => {
  libraryConfigs.current = {
    ...libraryConfigs.current,
    components,
  };
};
export const setSourcesConfig = (sources) => {
  libraryConfigs.current = {
    ...libraryConfigs.current,
    sources,
  };
};

export const setFormValidatorsMessageConfig = (validatorsMessage) => {
  libraryConfigs.current = {
    ...libraryConfigs.current,
    form: {
      ...form,
      validatorsMessage: {
        ...form.validatorsMessage,
        ...validatorsMessage,
      },
    },
  };
};

export const setLicenseConfig = (license) => {
  libraryConfigs.current = {
    ...libraryConfigs.current,
    license,
  };
};
