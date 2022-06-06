import { useContext } from 'react';
import { Context as AuthContext } from '../context/authContext';
import Messages from '../components/Messages';

function HomePage() {
  // const { user } = useContext(AuthContext);
  return (
    <>
      <h1>HOME PAGE</h1>
      {false ? (
        <>
          <h2>{'user.email'} is logged in.</h2>
        </>
      ) : (
        <>
          <p>There is no user data</p>
        </>
      )}
      <Messages />
    </>
  );
}

export default HomePage;
