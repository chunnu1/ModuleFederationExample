import React, { useRef, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import {MsalProvider, useMsal, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

import {callMsGraph} from "./graph"

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";

import AppContainer from "./components/AppContainer";

import axios from "axios";

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

const AfterAuth = () => {
  const { instance, accounts } = useMsal();

  const [accessToken,  setAccessToken] = useState("");

  const [graphData, setGraphData] = useState(null);

  const isAuthenticated = useIsAuthenticated();

  const getAuth0Token = (token) => {
    // const isAuth = useIsAuthenticated();
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      // TODO: remove later
    } else {
      console.log("auth0 exchange test: ", accessToken);
      const requestBody = {
        grant_type: 'client_credentials',
        client_id: "XXXRikadE8T9V11lCqIvitZNq8mABuho",
        client_secret: "mla_tLEVQKMaLYhB6ohnzOUW7kJDjHy9BacJMIXyDN3WVQusYvpvM795BdHVGGmO",
        audience: "https://dev-iq345rwyskpqun4m.us.auth0.com/api/v2/",
        assertion: token,
        scope: 'read:client_grants',
      };
      const auth0Domain = "dev-iq345rwyskpqun4m.us.auth0.com";
      const response = axios.post(
        `https://${auth0Domain}/oauth/token`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((result) => {
        console.log("auth0-result", result);
        const a0Token = result.data.access_token;
        window.sessionStorage.setItem("a0Dat.access_token", result.data.access_token);
        // document.addEventListener("getAuth0Token", (evt) => {
        //   console.log("app1 received token");
        //   this.auth0Token = evt.detail.access_token;
        // // });
        // const getAuth0Token = new CustomEvent("Auth0Token", {detail: {access_token: a0Token}});
        // console.log("emmitting auth0 access token");
        // document.dispatchEvent(getAuth0Token);
        // getAzureTokenFromAuthZero(a0Token);
      })
      .catch(err => {
        console.log("auth0-error", err);
      });
    }
  }

  const RequestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    console.log("Getting profile data silently");
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        setAccessToken(response.accessToken);
        // getAuth0Token(response.accessToken);
        const azureTokenEvt = new CustomEvent("AzureAccessTokenEvt", {detail: {access_token: response.accessToken}});
        console.log("emmitting azure access token");
        document.dispatchEvent(azureTokenEvt);
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  const listenForAccessTokenRequest = () => {
    document.addEventListener("GetAzureAccessTokenEvt", () => {
      const azureTokenEvt = new CustomEvent("AzureAccessTokenEvt", {detail: {access_token: accessToken}});
      console.log("emmitting azure access token");
      document.dispatchEvent(azureTokenEvt);
    });
  }

  useEffect(() => {
    RequestProfileData();
    listenForAccessTokenRequest();
  },[]);

  
  return <></>
}

const BeforeAuth = () => {

  const { instance, accounts } = useMsal();

  useEffect(()=>{
    // redirect to login
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    });
  },[]);
  return <></>
}

export default function App() {
  // const app1Ref = useRef(null);

  // useEffect(()=> {
  //   app1Mount(app1Ref.current)
  // }, []);

  const { instance, accounts } = useMsal();

  return (
    <div className="mx-auto max-w-6xl">
      <AuthenticatedTemplate>
        <AfterAuth />
        <AppContainer />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate><BeforeAuth /></UnauthenticatedTemplate>      
    </div>
  );
};

// ReactDOM.render(
//   <React.StrictMode>
//     <MsalProvider instance={msalInstance}>
//       <App />
//     </MsalProvider>
//   </React.StrictMode>,
//   // <App />,
//   document.getElementById("app")
// );

createRoot(document.getElementById("app")).render(
  // <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  // </React.StrictMode>
);


