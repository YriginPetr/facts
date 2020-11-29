import {
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderClose,
} from "@vkontakte/vkui";
import React from "react";
import { connect } from "react-redux";
import { OpenModal } from "../store/actions";
import Addmodal from "./add";
const modal = ({ activeModal, OpenModal }) => {
  return (
    <ModalRoot activeModal={activeModal} onClose={() => OpenModal(null)}>
      <ModalPage
        dynamicContentHeight
        header={
          <ModalPageHeader
            left={<PanelHeaderClose onClick={() => OpenModal(null)} />}
          >
            Предложить факт
          </ModalPageHeader>
        }
        id="add"
        onClose={() => OpenModal(null)}
      >
        <Addmodal />
      </ModalPage>
    </ModalRoot>
  );
};
const mapStatetoProps = (state) => ({
  activeModal: state.app.activeModal,
});
const mapDispatchtoProps = {
  OpenModal,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(modal);
