import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const UserPage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const [userClaims, setUserClaims] = useState();

  const sendVerificationEmail = async (claims) => {
    if (claims.email_verified) {
      return;
    }

    try {
      const body = JSON.stringify({
        user_id: user.sub,
      });

      const result = await fetch(
        "https://dev-i6qklqu4.eu.auth0.com/api/v2/jobs/verification-email",
        {
          method: "POST",
          body,
          headers: {
            "www-Authorize": "Bearer " + (await getAccessTokenSilently()),
          },
        }
      );

      const emailVerificationRequest = await result.json();

      alert("We sent you a verification email");
    } catch {}
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      getIdTokenClaims().then((claims) => {
        setUserClaims(claims);
        sendVerificationEmail(claims);
      });
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>
          Is email verified: {userClaims?.email_verified ? "true" : "false"}
        </p>
        <h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </h3>
      </div>
    );
  }

  return null;
};

export { UserPage };
