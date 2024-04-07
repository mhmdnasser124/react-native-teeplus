import { ActivityIndicator, FlatList, View } from "react-native";

import React from "react";
import { animatedInEaseOut } from "../../utils/helpers";
import { useState } from "core/hooks";

const Tab = ({ loading, renderTabHeaderActive, renderTabHeaderNotActive, tabHeaderContainerStyle, containerStyle, tabContainerStyle, selectedTab = 0, data, onChangeTab }) => {
  const [state, setState] = useState({
    initState: { activeTabIndex: selectedTab },
    animationAction: animatedInEaseOut,
  });
  const { activeTabIndex } = state;
  const renderTabHeader = ({ data, data: { index }, onChange }) => {
    if (index == activeTabIndex) return renderTabHeaderActive({ ...data, index, onChange });
    else return renderTabHeaderNotActive({ ...data, index, onChange });
  };
  const onChange = (data) => {
    setState({ activeTabIndex: data.index });
    !!onChangeTab && onChangeTab(data);
  };
  var Content = data[activeTabIndex]?.content;
  if (loading) return <ActivityIndicator />;
  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <View style={tabContainerStyle}>
        <FlatList showsHorizontalScrollIndicator={false} bounces={false} horizontal data={data} contentContainerStyle={tabHeaderContainerStyle} renderItem={(data) => renderTabHeader({ data, onChange })} />
      </View>
      {!!Content && Content(data[activeTabIndex])}
    </View>
  );
};

export default Tab;
