import React, { useEffect } from "react";

import View from "@vkontakte/vkui/dist/components/View/View";

import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import { connect } from "react-redux";
import { initApp } from "./store/actions";
import Popout from "./popout/popout";
import Modal from "./modal/modal";
const App = ({ panel, initApp, popout }) => {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <View
      activePanel={panel}
      popout={popout ? <Popout /> : null}
      modal={<Modal />}
    >
      <Home id="home" />
    </View>
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
