import React from "react";
import { Button, Div, Header, Headline, Title } from "@vkontakte/vkui";
import "./story.css";
import Icon28StoryAddOutline from "@vkontakte/icons/dist/28/story_add_outline";
import bridge from "@vkontakte/vk-bridge";
import { toPng } from "html-to-image";
import { connect } from "react-redux";
import { OpenModal, AppLoading, Error } from "../store/actions";
const AddStroymodal = ({ fact, OpenModal, AppLoading, Error }) => {
  const [theme, setTheme] = React.useState("white_theme");
  const createStory = async () => {
    try {
      AppLoading(true);
      const node = document.getElementById("card");
      const blob = await toPng(node, { pixelRatio: 1 });
      console.log(blob);
      const story = {
        background_type: "none",

        stickers: [
          {
            sticker_type: "renderable",
            sticker: {
              can_delete: 0,
              content_type: "image",
              blob: blob,
              transform: {
                relation_width: 0.8,
                gravity: "center",
              },
            },
          },
          {
            sticker_type: "renderable",
            sticker: {
              can_delete: 1,
              content_type: "image",
              url: "https://storage.googleapis.com/vkfacts/sticker.png",
              transform: {
                relation_width: 0.5,
                gravity: "center_bottom",
              },
              clickable_zones: [
                {
                  action_type: "app",
                  action: {
                    app_id: 7648099,
                  },
                },
              ],
            },
          },
        ],
      };
      await bridge.send("VKWebAppShowStoryBox", story);
      AppLoading(false);
      OpenModal(null);
    } catch (err) {
      AppLoading(false);
      OpenModal(null);
      console.log(err);
      if (!err.error_data.error_code === 4) {
        Error(true);
      }
    }
  };
  // https://storage.googleapis.com/vkfacts/sticker.png
  return (
    <div className={theme}>
      <Div>
        <div className={"story_card_cnt "} id="card">
          <div className="story_card__in">
            <div className="story_card_header">
              <Headline weight="medium">Интересный факт</Headline>
            </div>
            <div className="story_card_text">
              <Title level="2" weight="regular">
                {fact}
              </Title>
            </div>
          </div>
        </div>
      </Div>

      <Header mode="secondary">Стиль</Header>
      <Div className="story_theme_switch__cnt">
        <div className="story_theme_switch__in">
          <div
            className={
              "story_theme__switch " +
              (theme === "white_theme" ? "selected" : "")
            }
            onClick={() => setTheme("white_theme")}
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className={
              "story_theme__switch " +
              (theme === "black_theme" ? "selected" : "")
            }
            style={{ backgroundColor: "#171717" }}
            onClick={() => setTheme("black_theme")}
          ></div>
          <div
            className={
              "story_theme__switch " +
              (theme === "blue_theme" ? "selected" : "")
            }
            style={{ backgroundColor: "#4E7FFF" }}
            onClick={() => setTheme("blue_theme")}
          ></div>
        </div>
      </Div>
      <Div>
        <Button
          size="xl"
          before={<Icon28StoryAddOutline />}
          onClick={createStory}
        >
          Добавить
        </Button>
      </Div>
    </div>
  );
};
const mapStatetoProps = (state) => ({
  fact: state.fact.facts[state.fact.currentIndex].text,
});
const mapDispatchtoProps = {
  OpenModal,
  AppLoading,
  Error,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(AddStroymodal);
