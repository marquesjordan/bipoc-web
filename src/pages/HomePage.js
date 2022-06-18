import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/authContext';
import Messages from '../components/Messages';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  // const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.token) {
      navigate('/login', { replace: true });
    }
  }, [state, navigate]);

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
