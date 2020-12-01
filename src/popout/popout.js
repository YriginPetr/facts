import {
  ActionSheet,
  ActionSheetItem,
  Button,
  IOS,
  Placeholder,
  PopoutWrapper,
  ScreenSpinner,
  usePlatform,
} from "@vkontakte/vkui";
import Icon28UserCircleOutline from "@vkontakte/icons/dist/28/user_circle_outline";
import Icon28AddCircleOutline from "@vkontakte/icons/dist/28/add_circle_outline";
import React from "react";
import { OpenMenu, OpenModal, Restart, ShareFact } from "../store/actions";
import { connect } from "react-redux";
import Icon56ErrorOutline from "@vkontakte/icons/dist/56/error_outline";
import Icon24Replay from "@vkontakte/icons/dist/24/replay";
import Icon28StoryAddOutline from "@vkontakte/icons/dist/28/story_add_outline";
import Icon28ShareOutline from "@vkontakte/icons/dist/28/share_outline";
const Popout = ({
  loading,
  factLoading,
  popout,
  menuOpen,
  OpenMenu,
  author_id,
  OpenModal,
  error,
  Restart,
  ShareFact,
}) => {
  const platfrom = usePlatform();
  if (!popout) {
    return null;
  } else if (error) {
    return (
      <div className="popout_wrapper">
        <Placeholder
          stretched
          icon={<Icon56ErrorOutline />}
          action={
            <Button
              onClick={Restart}
              mode="overlay_primary"
              size="l"
              stretched
              before={<Icon24Replay />}
            >
              Обновить
            </Button>
          }
          header="Ошибка"
        >
          Проверьте интернет-соединение
        </Placeholder>
      </div>
    );
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
          onClick={() => ShareFact()}
          autoclose
          before={<Icon28ShareOutline />}
        >
          Поделиться
        </ActionSheetItem>
        <ActionSheetItem
          onClick={() => OpenModal("addStroy")}
          autoclose
          before={<Icon28StoryAddOutline />}
        >
          Поделиться в истории
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
  error: state.app.error,
});
const mapDispathtoProps = {
  OpenMenu,
  OpenModal,
  Restart,
  ShareFact,
};
export default connect(mapStatetoProps, mapDispathtoProps)(Popout);
