import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { Snackbar } from "@vkontakte/vkui";
import { APIURL } from "./const";
import {
  APPINIT,
  APPLOADING,
  CHANGEPANEL,
  ERROR,
  FACTEND,
  FACTLOADING,
  LOADFACTS,
  NEXTFACT,
  NOTIFICATION,
  OPENMENU,
  OPENMODAL,
  RESTART,
  USERUPDATEINFO,
} from "./types";

export const initApp = () => async (dispatch) => {
  try {
    await bridge.send("VKWebAppInit", {});
    dispatch({ type: APPINIT });

    const user = await fetch(
      `${APIURL}/api/user/login${window.location.search}`
    );
    const userData = await user.json();
    dispatch(updateUserInfo(userData));

    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      console.log(hash);
      const factsResponse = await fetch(
        `${APIURL}/api/fact/getbyid${window.location.search}&id=${hash}`
      );
      const factsData = await factsResponse.json();
      if (factsData === null) {
        dispatch(Error(true));
      } else {
        dispatch(loadFacts([factsData]));
        dispatch(FactLoading(false));
        dispatch(AppLoading(false));
      }
    } else {
      dispatch(nextFact());
    }
  } catch (err) {
    console.log(err);
    dispatch(Error(true));
  }
};
export const changePanel = (panel) => ({
  type: CHANGEPANEL,
  payload: panel,
});

export const nextFact = () => async (dispatch, getState) => {
  try {
    const { currentIndex, globalIndex, facts } = getState().fact;
    if (currentIndex + 1 === facts.length || facts.length === 0) {
      dispatch(FactLoading(true));
      try {
        const factsResponse = await fetch(
          `${APIURL}/api/fact/get${window.location.search}&skip=${
            currentIndex + globalIndex + (facts.length !== 0 && 1)
          }`
        );
        const factsData = await factsResponse.json();

        if (factsData.length === 0) {
          dispatch(factEnds());
        } else {
          const promises = await factsData.map((fact) => {
            return new Promise((reslove, reject) => {
              const img = new Image();
              img.src = fact.image;
              img.onerror = reject;
              img.onload = reslove;
            });
          });
          await Promise.all(promises);

          dispatch(loadFacts(factsData));
          facts.length !== 0 && dispatch({ type: NEXTFACT });
          facts.length === 0 && dispatch(AppLoading(false));
        }
        dispatch(FactLoading(false));
      } catch (err) {
        dispatch(Error(true));
      }
    } else {
      dispatch({ type: NEXTFACT });
      await fetch(
        `${APIURL}/api/user/updateprogress${window.location.search}&index=${
          currentIndex + globalIndex + 1
        }`
      );
    }
  } catch (err) {
    dispatch(Error(true));
    console.log(err);
  }
};
export const loadFacts = (facts) => ({ type: LOADFACTS, payload: facts });

export const updateUserInfo = (data) => ({
  type: USERUPDATEINFO,
  payload: data,
});

export const welcomeComplete = () => ({ type: "WELCOMECOMPLETE" });

export const factEnds = () => ({ type: FACTEND });

export const AppLoading = (status) => ({ type: APPLOADING, payload: status });
export const FactLoading = (status) => ({ type: FACTLOADING, payload: status });
export const OpenMenu = (status) => ({ type: OPENMENU, payload: status });
export const OpenModal = (modal) => ({ type: OPENMODAL, payload: modal });
export const Error = (status) => ({ type: ERROR, payload: status });
export const Notification = (text) => async (dispatch) => {
  dispatch({
    type: NOTIFICATION,
    payload: (
      <Snackbar
        duration="2000"
        onClose={() => dispatch({ type: NOTIFICATION, payload: null })}
      >
        {text}
      </Snackbar>
    ),
  });
};
export const Restart = () => async (dispatch) => {
  try {
    dispatch({ type: RESTART });
    const user = await fetch(
      `${APIURL}/api/user/login${window.location.search}`
    );
    const userData = await user.json();
    dispatch(updateUserInfo(userData));
    dispatch(nextFact());
  } catch (err) {
    dispatch(Error(true));
  }
};
export const ShareFact = () => async (dispatch, getState) => {
  try {
    const { currentIndex, facts } = getState().fact;
    const factid = facts[currentIndex]["_id"];
    console.log(factid);
    await bridge.send("VKWebAppShare", {
      link: `https://vk.com/app7648099#${factid}`,
    });
    dispatch(OpenMenu(false));
  } catch (err) {
    dispatch(OpenMenu(false));
  }
};
