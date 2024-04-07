import React from "react";
import { useEffect } from "react";
import useEntity from "reduxApp/utils/entity";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "core/hooks";
const EntityWrapper = ({
  renderItem,
  renderLoading,
  withoutLoading = false,
  refresh,
  methodType,
  endpoint,
  baseUrl,
  queries,
  headers,
  params,
  mockData,
  showFailNotification,
  onSuccess,
  onFailure,
  showLoading = true,
  delay,
  interval,
  renderHeader = () => {},
  isFocus = false,
  cacheKey,
}) => {
  const [state, setState] = useState({
    initState: {
      data: {},
      error: null,
      isLoading: true,
    },
  });
  const { POST, DELETE, PUT, PATCH, GET } = useEntity();

  const runnerMap = { POST, DELETE, PUT, PATCH, GET };
  const onGet = () => {
    if (!withoutLoading && showLoading) setState({ isLoading: true });
    runnerMap[methodType]({
      showFailNotification,
      endpoint,
      baseUrl,
      queries,
      headers,
      params,
      mockData,
      cacheKey,
      delay,
      interval,
      onSuccess: (data) => {
        !!onSuccess && onSuccess(data);
        setState({ data, isLoading: false });
      },
      onFailure: (data) => {
        !!onFailure && onFailure(data);
        setState({ data, isLoading: false });
      },
    });
  };

  if (isFocus)
    useFocusEffect(
      React.useCallback(() => {
        onGet();
      }, [JSON.stringify(queries), JSON.stringify(params), refresh]),
    );
  else
    useEffect(() => {
      onGet();
    }, [JSON.stringify(queries), JSON.stringify(params), refresh]);

  if (state.isLoading)
    return (
      <>
        {renderHeader?.()}
        {renderLoading?.()}
      </>
    );
  else
    return (
      <>
        {renderHeader?.(state.data)}
        {renderItem?.(state.data)}
      </>
    );
};

export default EntityWrapper;
