import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {MsalProvider, useMsal, useIsAuthenticated} from "@azure/msal-react";

import { mount as app1Mount } from "app1/bootloader";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";

console.log("init msal");
const msalInstance = new PublicClientApplication(msalConfig);
msalInstance
  .handleRedirectPromise()
  .then((tokenResponse) => {
    // Handle redirect response
  })
  .catch((error) => {
    // Handle redirect error
  });

export default function App() {
  // const app1Ref = useRef(null);

  // useEffect(()=> {
  //   app1Mount(app1Ref.current)
  // }, []);

  const { instance, accounts } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    console.log("Getting profile data silently");
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      // redirect to login
      instance.loginRedirect(loginRequest).catch(e => {
        console.log(e);
      });
    } else {
      console.log("get profile info");
      RequestProfileData();
    }
  }, [])

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: host</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Tailwind</div>
      <div ref={app1Mount} class="app1" />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  // <App />,
  document.getElementById("app")
);
