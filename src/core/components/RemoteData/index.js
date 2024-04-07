import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { beautifyParams, beautifyQueries, getAttrData, hdp, isEmpty, wdp } from "../../utils/helpers";
import { getConfigProps, mergeProps } from "core/utils/component";

import Text from "../Text";
import styles from "./styles";
import useEntity from "reduxApp/utils/entity";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "../../hooks";

const RemoteData = (propsData) => {
  const props = mergeProps(propsData, getConfigProps("RemoteData"));
  var {
    delay = 0,
    endpoint = ``,
    pagination = true,
    initPage = 0,
    params = null,
    queries = null,
    data,
    dataAttr = [],
    extraData = [],
    onFetchData = () => {},
    onFetchFullData,
    onFirstFetchData,
    refrence,
    cacheEnable = false,
    pageAction,
    ListEmptyComponent = () => (
      <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
        <Text>Data not found</Text>
      </View>
    ),
    LoadingComponent = () => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          height: hdp(10),
          flex: 1,
        }}
      >
        <ActivityIndicator />
      </View>
    ),
    pageKey,
    lengthKey,
    lengthValue = 10,
    renderItem,
    sections = {},
    canRefresh = true,
    contentContainerStyle,
    focusRefresh = false,
  } = props;
  const initState = {
    changeProps: [queries, params, endpoint, data],
    isFirst: false,
    isRefresh: false,
    disableLoadMore: false,
    page: initPage,
    fetchData: data || [],
    forceUpdate: false,
    fullData: null,
    firstFetch: true,
  };
  const [state, setState] = useState({ initState });
  const { isFirst, isRefresh, disableLoadMore, page, fetchData, changeProps, forceUpdate, fullData, firstFetch } = state;
  const { GET, isExecuting } = useEntity();
  const flatListRef = useRef(null);
  useEffect(() => {
    refrence?.({ refresh: initGet, ...flatListRef.current });
  }, [flatListRef]);
  if (focusRefresh)
    useFocusEffect(
      React.useCallback(() => {
        onGet();
      }, [page, queries, forceUpdate, data]),
    );
  else
    useEffect(() => {
      onGet();
    }, [page, queries, forceUpdate, data]);
  const onGet = () => {
    if (JSON.stringify(changeProps) == JSON.stringify([queries, params, endpoint, data])) getData();
    else initGet();
  };
  useEffect(() => {
    if (fetchData.length > 0) onFetchData(fetchData);
  }, [fetchData, forceUpdate]);
  const getData = () => {
    if (!!!endpoint) return null;
    if (pagination)
      queries = {
        ...queries,
        ...(!!pageKey && { [pageKey]: page }),
        ...(!!lengthKey && { [lengthKey]: lengthValue }),
      };
    GET({
      delay,
      cacheKey: cacheEnable ? endpoint + beautifyParams(params) + beautifyQueries(queries) : null,
      endpoint,
      queries: queries,
      params: params,
      onSuccess: (data) => {
        !!onFetchFullData && onFetchFullData(data);
        if (firstFetch) !!onFirstFetchData && onFirstFetchData(data);
        setState({
          firstFetch: false,
          isRefresh: false,
          fullData: data,
          fetchData: isFirst ? [...getAttrData(dataAttr, data)] : [...fetchData, ...getAttrData(dataAttr, data)],
        });
        if (getAttrData(dataAttr, data).length < lengthValue || !pagination) setState({ disableLoadMore: true });
      },
      onFailure: () => {},
    });
  };
  const initGet = () => setState({ ...initState, forceUpdate: !forceUpdate });
  const renderListItem = (item) => (
    <>
      {!!sections[item.index] && sections[item.index].component(fullData)}
      {renderItem(item)}
    </>
  );

  var isLoading = (!!endpoint && fetchData.length == 0 && page == initPage && !disableLoadMore) || JSON.stringify(changeProps) !== JSON.stringify([queries, params, endpoint, data]);
  var isLoadingMore = !disableLoadMore && !isLoading && !!endpoint;
  const { data: dta, horizontal, ...restProps } = props;
  return (
    <FlatList
      ref={flatListRef}
      horizontal={horizontal}
      onEndReached={() => !disableLoadMore && !isExecuting("GET", endpoint) && setState({ page: pageAction(page) })}
      onEndReachedThreshold={0.2}
      refreshControl={canRefresh && <RefreshControl refreshing={isRefresh} onRefresh={initGet} />}
      data={[...extraData, ...fetchData]}
      keyExtractor={(item, index) => `RemoteData-item-${index}`}
      {...restProps}
      contentContainerStyle={[styles.listContainer(!isLoading && isEmpty(fetchData) ? 1 : 0), contentContainerStyle]}
      ListFooterComponent={() =>
        !!isLoadingMore && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flex: 1,
              padding: 30,
              width: wdp(100),
            }}
          >
            <ActivityIndicator />
          </View>
        )
      }
      ListEmptyComponent={() => (!!isLoading ? !!LoadingComponent && LoadingComponent() : !!ListEmptyComponent && ListEmptyComponent())}
      renderItem={renderListItem}
    />
  );
};
const App = (props) => <RemoteData {...props} />;
export default React.memo(App, shouldRender);
function shouldRender(prevProps, nextProps) {
  if (!!nextProps?.forceUpdate) return false;
  if (JSON.stringify(nextProps) === JSON.stringify(prevProps)) return true;
  else return false;
}
