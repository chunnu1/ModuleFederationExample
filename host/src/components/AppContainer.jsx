import { useState } from "react";
import Tasks from "./Tasks";

export const AppHead = () => {
  return (
    <div className="app-head flex flex-row  text-white">
      <span style={{ color: "yellow", fontWeight: "bold" }}>Hej!</span>
      <div className="grow head-menus flex flex-row justify-end">
        <span className="material-symbols-outlined mr-4">search</span>
        <span className="material-symbols-outlined mr-4">help</span>
        <span className="material-symbols-outlined mr-4">notifications</span>
        <span className="material-symbols-outlined mr-4">apps</span>
      </div>
    </div>
  );
};

export const AppFoot = ({ chooseTab }) => {
  return (
    <div className="foot-container app-foot flex flex-row justify-between">
      <span className="foot-item material-symbols-outlined">home</span>
      <span className="foot-item material-symbols-outlined">feed</span>
      <span className="foot-item material-symbols-outlined">calendar_month</span>
      <span
        className="foot-item material-symbols-outlined"
        onClick={() => chooseTab(<Tasks chooseTab={chooseTab} />)}
      >
        task_alt
      </span>
      <span className="foot-item material-symbols-outlined">menu</span>
    </div>
  );
};

export const Container = () => {};

import { mount as app1Mount } from "app1/bootloader";

export default function AppContainer(props) {
//   const [currentLayout, setCurrentLayout] = useState(<div ref={app1Mount} className="app1" />);

  const chooseTab = (component) => {    
    setCurrentLayout(component);    
  };

  const [currentLayout, setCurrentLayout] = useState(<Tasks chooseTab={chooseTab} />);

  return (
    <div className="app-container flex flex-col">
      <AppHead chooseTab={chooseTab} />
      <div className="grow">{currentLayout}</div>
      <AppFoot chooseTab={chooseTab}/>
    </div>
  );
}
