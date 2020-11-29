import {
  ActionSheet,
  ActionSheetItem,
  IOS,
  PopoutWrapper,
  ScreenSpinner,
  usePlatform,
} from "@vkontakte/vkui";
import Icon28UserCircleOutline from "@vkontakte/icons/dist/28/user_circle_outline";
import Icon28AddCircleOutline from "@vkontakte/icons/dist/28/add_circle_outline";
import React from "react";
import { OpenMenu, OpenModal } from "../store/actions";
import { connect } from "react-redux";
const Popout = ({
  loading,
  factLoading,
  popout,
  menuOpen,
  OpenMenu,
  author_id,
  OpenModal,
}) => {
  const platfrom = usePlatform();
  if (!popout) {
    return null;
  } else if (loading) {
    return (
      <div className="popout_wrapper">
        <ScreenSpinner />
      </div>
    );
  } else if (factLoading) {
    return (
      <PopoutWrapper>
        <ScreenSpinner />
      </PopoutWrapper>
    );
  } else if (menuOpen) {
    return (
      <ActionSheet onClose={() => OpenMenu(false)}>
        <ActionSheetItem
          href={`https://vk.com/id${author_id ? author_id.author_id : 0}`}
          target="_blank"
          autoclose
          before={<Icon28UserCircleOutline />}
        >
          Автор
        </ActionSheetItem>
        <ActionSheetItem
          onClick={() => OpenModal("add")}
          autoclose
          before={<Icon28AddCircleOutline />}
        >
          Предложить факт
        </ActionSheetItem>
        {platfrom === IOS && (
          <ActionSheetItem autoclose mode="cancel">
            Закрыть
          </ActionSheetItem>
        )}
      </ActionSheet>
    );
  }
  return null;
};
const mapStatetoProps = (state) => ({
  //   popout: state.app.popout,
  loading: state.app.loading,
  factLoading: state.fact.loading,
  popout: state.app.popout,
  menuOpen: state.app.menuOpen,
  author_id: state.fact.facts[state.fact.currentIndex],
});
const mapDispathtoProps = {
  OpenMenu,
  OpenModal,
};
export default connect(mapStatetoProps, mapDispathtoProps)(Popout);
