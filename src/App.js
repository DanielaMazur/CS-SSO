import { Auth0Provider } from "@auth0/auth0-react";
import { LoginPage } from "./login-page";

import { UserPage } from "./user-page";

function App() {
  return (
    <Auth0Provider
      domain="dev-i6qklqu4.eu.auth0.com"
      clientId="hi2bSsgmetUzdyKIEZFoa7i1emgNk56w"
      redirectUri={window.location.origin}
    >
      <LoginPage />
      <UserPage />
    </Auth0Provider>
  );
}

export default App;
