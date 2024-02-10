"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const AuthOProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-nooberboy.us.auth0.com"
      clientId="4vgai7SjLddLYNH2qyXEA70VOIo0hqOj"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthOProvider;
