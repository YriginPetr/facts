import React from "react";
import bridge from "@vkontakte/vk-bridge";
import { Snackbar } from "@vkontakte/vkui";
import { APIURL } from "./const";
import {
  APPINIT,
  APPLOADING,
  CHANGEPANEL,
  CLOSELOADER,
  FACTEND,
  FACTLOADING,
  LOADFACTS,
  NEXTFACT,
  NOTIFICATION,
  OPENMENU,
  OPENMODAL,
  USERUPDATEINFO,
} from "./types";

export const initApp = () => async (dispatch, getState) => {
  try {
    await bridge.send("VKWebAppInit", {});
    dispatch({ type: APPINIT });

    const user = await fetch(
      `${APIURL}/api/user/login${window.location.search}`
    );
    const userData = await user.json();
    dispatch(updateUserInfo(userData));
    dispatch(nextFact());
  } catch (err) {
    console.log(err);
  }
};
export const changePanel = (panel) => ({
  type: CHANGEPANEL,
  payload: panel,
});

export const nextFact = () => async (dispatch, getState) => {
  const { currentIndex, globalIndex, facts } = getState().fact;
  if (currentIndex + 1 === facts.length || facts.length === 0) {
    dispatch(FactLoading(true));

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
  } else {
    dispatch({ type: NEXTFACT });
    await fetch(
      `${APIURL}/api/user/updateprogress${window.location.search}&index=${
        currentIndex + globalIndex + 1
      }`
    );
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
