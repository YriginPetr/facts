import React, { useEffect, useState } from "react";

import View from "@vkontakte/vkui/dist/components/View/View";

import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import { connect } from "react-redux";
import { initApp } from "./store/actions";
import Popout from "./popout/popout";
import Modal from "./modal/modal";
import bridge from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";
const App = ({ panel, initApp, popout }) => {
  const [scheme, SetStateScheme] = useState("bright_light");
  const lights = ["bright_light", "client_light"];

  useEffect(() => {
    initApp();
  }, []);
  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        camelCase(data.scheme);
      }
    });
    bridge.send("VKWebAppSetViewSettings", {
      status_bar_style: "light",
      action_bar_color: "#4e7fff",
    });
  }, []);
  const camelCase = (scheme, needChange = false) => {
    let isLight = lights.includes(scheme);

    if (needChange) {
      isLight = !isLight;
    }
    SetStateScheme(isLight ? "bright_light" : "space_gray");
  };
  return (
    <ConfigProvider isWebView={true} scheme={scheme}>
      <View
        activePanel={panel}
        popout={popout ? <Popout /> : null}
        modal={<Modal />}
      >
        <Home id="home" />
      </View>
    </ConfigProvider>
  );
};
const mapStatetoProps = (state) => ({
  panel: state.app.panel,
  popout: state.app.popout,
});
const mapDispatchToProps = {
  initApp,
};
export default connect(mapStatetoProps, mapDispatchToProps)(App);
