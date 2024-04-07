import React, { useEffect } from "react";

import { Icon } from "core/components";
import { animatedInEaseOut } from "../../utils/helpers";
import { useState } from "core/hooks";

const CustomNavigation = ({ data, refrance, headerOptions }) => {
  const [state, setState] = useState({
    initState: { navigations: [{ name: data.defaultScreen, props: null }] },
    animationAction: animatedInEaseOut,
  });
  const { navigations } = state;
  const Screen = data.screens[navigations[navigations?.length - 1].name].component;
  var customNavigation = {
    navigate: (activeScreen, props) => setState({ navigations: [...navigations, { name: activeScreen, props }] }),
    goBack: () => setState({ navigations: navigations.slice(0, navigations.length - 1) }),
    currentRoute: navigations[navigations.length - 1],
  };

  useEffect(() => {
    if (!!refrance) refrance.current = customNavigation;
  }, [navigations]);

  const renderBack = () => {
    if (headerOptions?.showBack && navigations.length !== 1) return <Icon onPress={customNavigation.goBack} name={headerOptions?.backIcon || "arrowBack"} width={28} height={28} color="#63687D" style={headerOptions?.containerStyle} />;
    else return null;
  };
  return (
    <>
      {renderBack()}
      <Screen {...navigations[navigations?.length - 1].props} customNavigation={customNavigation} />
    </>
  );
};

export default CustomNavigation;
