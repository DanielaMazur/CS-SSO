import { useAuth0 } from "@auth0/auth0-react";

const UserPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </h3>
      </div>
    );
  }

  return null;
};

export { UserPage };
