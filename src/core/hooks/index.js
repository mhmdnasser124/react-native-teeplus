import { useCallback, useEffect, useRef, useState as useStateOrginal } from "react";

import { isEmpty } from "../utils/helpers";

export const useState = ({ initState = {}, animationAction }) => {
  const state = useRef(initState);
  const callbackRef = useRef(null);
  const setState = (newState, options) => {
    var changeState = () => {
      state.current = { ...state.current, ...newState };
      if (isEmpty(options?.isForceUpdate) || true) forceUpdate();
      !!animationAction && animationAction();
      if (!isEmpty(options?.callback)) callbackRef.current = options.callback;
    };
    if (isEmpty(options?.delay)) changeState();
    else setTimeout(() => changeState(), options?.delay);
  };

  function handleStateUpdate() {
    if (callbackRef.current !== null) {
      callbackRef.current();
      callbackRef.current = null;
    }
  }
  const [, updateState] = useStateOrginal();
  const forceUpdate = useCallback(() => updateState({}), []);

  var statee = state.current;
  useEffect(handleStateUpdate, [statee]);

  return [statee, setState];
};
