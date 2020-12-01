import React, { Fragment } from "react";
import {
  FixedLayout,
  Panel,
  PanelHeader,
  Title,
  Div,
  Text,
  Button,
  PanelHeaderButton,
  Placeholder,
} from "@vkontakte/vkui";
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";
import Icon56RecentOutline from "@vkontakte/icons/dist/56/recent_outline";
import "./home.css";
import Icon28PrivacyOutline from "@vkontakte/icons/dist/28/privacy_outline";
import { connect } from "react-redux";
import {
  nextFact,
  welcomeComplete,
  OpenMenu,
  OpenModal,
} from "../store/actions";
import Icon28MoreVertical from "@vkontakte/icons/dist/28/more_vertical";
const Home = ({
  id,
  currentFact,
  currentIndex,
  nextFact,
  welcomeCompleted,
  welcomeComplete,
  isEnd,
  OpenMenu,
  menuOpen,
  OpenModal,
  notification,
}) => {
  const clickHandler = () => {
    if (!isEnd) {
      if (welcomeCompleted) {
        nextFact();
      } else {
        welcomeComplete();
      }
    }
  };
  return (
    <Panel id={id} className="home_panel" centered>
      <PanelHeader
        visor={false}
        transparent
        separator={false}
        left={
          menuOpen || isEnd || !welcomeCompleted ? null : (
            <PanelHeaderButton onClick={OpenMenu}>
              <Icon28MoreVertical />
            </PanelHeaderButton>
          )
        }
      >
        facts
      </PanelHeader>
      <div className="content">
        <TransitionGroup>
          <CSSTransition
            key={isEnd ? "isend" : welcomeCompleted ? currentIndex : "welcome"}
            timeout={300}
            classNames="slide"
          >
            {currentFact && !isEnd && welcomeCompleted ? (
              <div
                key={
                  isEnd ? "isend" : welcomeCompleted ? currentIndex : "welcome"
                }
                className="fact_background"
                style={{ backgroundImage: `url(${currentFact.image})` }}
              />
            ) : (
              <div
                className="fact_background"
                style={{ backgroundColor: "#4e7fff" }}
              />
            )}
          </CSSTransition>
        </TransitionGroup>

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isEnd ? "isend" : welcomeCompleted ? currentIndex : "welcome"}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            {isEnd ? (
              <div
                style={{
                  margin: "40px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  zIndex: 9,
                }}
                key={
                  isEnd ? "isend" : welcomeCompleted ? currentIndex : "welcome"
                }
              >
                <Placeholder
                  style={{ zIndex: 9 }}
                  icon={<Icon56RecentOutline />}
                  header=" На этом все"
                  action={
                    <Button
                      mode="overlay_primary"
                      size="xl"
                      onClick={() => OpenModal("add")}
                      stretched
                      style={{ zIndex: 9 }}
                    >
                      Предложить факт
                    </Button>
                  }
                >
                  Совсем скоро мы добавим новый факты
                </Placeholder>

                {/* <Div style={{ width: "100%" }}>
                  <Button size="xl" mode="overlay_secondary" stretched>
                    Начать заново
                  </Button>
                </Div> */}
              </div>
            ) : (
              <div
                style={{ margin: "40px" }}
                key={
                  isEnd ? "isend" : welcomeCompleted ? currentIndex : "welcome"
                }
              >
                <Title level="1" weight="medium">
                  {currentFact && welcomeCompleted
                    ? currentFact.text
                    : "Давайте узнаем самые паразительные факты со всей вселенной"}
                </Title>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
        {!isEnd && (
          <FixedLayout vertical="bottom">
            <Div>
              <div className="bottom-helper">
                <Fragment>
                  <div className="bottom-helper-icon">
                    <Icon28PrivacyOutline fill="#fff" />
                  </div>
                  <Text weight="regular">
                    Нажмите на экран, чтобы
                    {welcomeCompleted ? " увидит новый факт" : " продолжить"}
                  </Text>
                </Fragment>
              </div>
            </Div>
          </FixedLayout>
        )}
      </div>
      {notification}
      <div className="clickable_area" onClick={clickHandler}></div>
    </Panel>
  );
};
const mapStatetoProps = (state) => ({
  currentFact: state.fact.facts[state.fact.currentIndex],
  currentIndex: state.fact.currentIndex,
  welcomeCompleted: state.app.welcomeCompleted,
  isEnd: state.fact.isEnd,
  menuOpen: state.app.menuOpen,
  notification: state.app.notification,
});
const mapDispatchtoProps = {
  nextFact,
  welcomeComplete,
  OpenMenu,
  OpenModal,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
