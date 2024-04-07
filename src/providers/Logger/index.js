import { FlatList, I18nManager, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { createContext, useContext, useEffect, useRef } from "react";

import { envType } from "configs/env";
import { useState } from "core/hooks";
import { wdp } from "core/utils/helpers";

export const LOGGER_INITIAL_STATE = {
  visible: false,
  loggs: [],
  isActive: false,
};

// initializing context
export const LoggerContext = createContext(LOGGER_INITIAL_STATE);

// setting a helper function to use context
export const useLogger = () => useContext(LoggerContext);

export function LoggerProvider({ children, disable }) {
  const [state, setState] = useState({ initState: LOGGER_INITIAL_STATE });
  const loggs = useRef([]);
  const { visible, isActive } = state;

  useEffect(() => {
    const init = async () => {
      setState({ isActive: true });
    };
    const oldConsoleLog = console.log;
    console.log = (...args) => {
      setState({ args });
      loggs.current = [JSON.stringify(args), ...loggs.current];
      oldConsoleLog(...args);
    };
    setTimeout(() => init(), 2000);
    return () => {
      console.log = oldConsoleLog;
    };
  }, []);
  return (
    <LoggerContext.Provider>
      {children}
      {__DEV__ && envType !== "prod" && !disable && (
        <View style={{ position: "absolute", alignSelf: "center", top: 55 }}>
          {!visible && (
            <TouchableOpacity
              onPress={() => setState({ visible: !visible })}
              style={{
                backgroundColor: `rgba(255,0,0,0.3)`,
                paddingVertical: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 8, color: "white", fontWeight: "bold" }}>Logger</Text>
            </TouchableOpacity>
          )}
          {visible && (
            <View style={{ height: 400 }} visible={visible} transparent onRequestClose={() => setState({ visible: false })}>
              <View style={{ height: 400, width: wdp(90), alignSelf: "center" }}>
                <TouchableOpacity
                  onPress={() => setState({ visible: !visible })}
                  style={{
                    backgroundColor: `rgba(255,0,0,0.3)`,
                    paddingVertical: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ fontSize: 8, color: "white", fontWeight: "bold" }}>Close</Text>
                </TouchableOpacity>
                <FlatList
                  contentContainerStyle={{
                    backgroundColor: `rgba(0,0,0,0.7)`,
                    paddingVertical: 10,
                    paddingVertical: 5,
                  }}
                  data={loggs.current.reverse()}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "white",
                        marginVertical: 5,
                      }}
                    />
                  )}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        paddingHorizontal: 10,
                        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          color: "white",
                          fontWeight: "900",
                        }}
                      >
                        {loggs.current.length - index}--
                      </Text>
                      <Text style={{ fontSize: 8, color: "white" }}>{item}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </LoggerContext.Provider>
  );
}
