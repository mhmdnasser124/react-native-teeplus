import React, { useEffect } from "react";

import { AppNavigation } from "navigations";
import { DebugModeLabel } from "core/components";
import { GlobalNotification } from "components";
import { GlobalNotificationsProvider } from "core/providers";
import { envType } from "configs/env";
import init from "configs/init";
import { useState } from "core/hooks";

const App = () => {
  const [state, setState] = useState({ initState: { isInit: false } });

  useEffect(() => {
    init();
    setTimeout(() => setState({ isInit: true }), 300);
    return () => {};
  }, []);

  if (!state.isInit) return null;

  return (
    <GlobalNotificationsProvider>
      <AppNavigation />
      <GlobalNotification />
      <DebugModeLabel label={envType} />
    </GlobalNotificationsProvider>
  );
};

export default App;
