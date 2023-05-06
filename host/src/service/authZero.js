import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth0Exchange = () => {
  const [auth0AccessToken, setAuth0AccessToken] = useState(null);

  useEffect(() => {
    const exchangeAzureADTokenForAuth0Token = async () => {
      try {
        const azureADAccessToken = 'your-azuread-access-token'; // Replace with the actual Azure AD access token
        const auth0Domain = 'your-auth0-domain'; // Replace with your Auth0 domain
        const clientId = 'your-auth0-client-id'; // Replace with your Auth0 client ID
        const clientSecret = 'your-auth0-client-secret'; // Replace with your Auth0 client secret
        const audience = 'your-auth0-audience'; // Replace with your Auth0 audience

        const response = await axios.post(
          `https://${auth0Domain}/oauth/token`,
          {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience,
            assertion: azureADAccessToken,
            scope: 'openid',
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const { access_token } = response.data;
        setAuth0AccessToken(access_token);
      } catch (error) {
        console.error('Error exchanging tokens:', error);
      }
    };

    exchangeAzureADTokenForAuth0Token();
  }, []);

  return (
    <div>
      {auth0AccessToken ? (
        <p>Auth0 access token: {auth0AccessToken}</p>
      ) : (
        <p>Exchanging tokens...</p>
      )}
    </div>
  );
};

export default Auth0Exchange;