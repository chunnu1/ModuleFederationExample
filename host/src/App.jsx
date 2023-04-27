import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import {mount as app1Mount} from "app1/bootloader";

const App = () => {
  // const app1Ref = useRef(null);

  // useEffect(()=> {
  //   app1Mount(app1Ref.current)
  // }, []);

  return (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div>
    <div ref={app1Mount} />
  </div>
)};
ReactDOM.render(<App />, document.getElementById("app"));
