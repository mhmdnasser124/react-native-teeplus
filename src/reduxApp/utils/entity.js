import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import EntityActions from "../actions/entity";
import { useState } from "core/hooks";

const useEntity = () => {
  const [state, setState] = useState({ initState: { screenRequests: [] } });
  const { screenRequests } = state;
  const entity = useSelector((state) => state.entity);
  const dispatch = useDispatch();
  var intervalId = useRef();
  const execAction = (proccess, interval) => {
    if (!!interval) return setInterval(proccess, interval);
    else proccess();
  };
  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, [intervalId]);
  const GET = (data) => {
    intervalId.current = execAction(() => {
      addNewRequest(data.endpoint);
      dispatch(EntityActions.request({ ...data, method: "GET" }));
    }, data?.interval);
  };
  const POST = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.request({ ...data, method: "POST" }));
  };
  const DELETE = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.request({ ...data, method: "DELETE" }));
  };
  const PUT = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.request({ ...data, method: "PUT" }));
  };
  const PATCH = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.request({ ...data, method: "PATCH" }));
  };
  const UPLOAD = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.request({ ...data, method: "UPLOAD" }));
  };
  const DOWNLOAD = (data) => {
    addNewRequest(data.endpoint);
    dispatch(EntityActions.download({ ...data, method: "GET" }));
  };

  const isExecuting = (method, endpoint) => !!entity.METHODS[method]?.[endpoint]?.executing;

  const addNewRequest = (endpoint) => {
    const requestsSet = new Set(screenRequests);
    requestsSet.add("GET " + endpoint);
    setState({ screenRequests: [...requestsSet] });
  };

  return {
    isExecuting,
    GET,
    POST,
    DELETE,
    UPLOAD,
    DOWNLOAD,
    PUT,
    PATCH,
  };
};

export default useEntity;
