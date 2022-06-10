import createDataContext from '../context/createDataContext';
import api from '../api';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'auth':
      return { ...state, errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const logout = (dispatch) => {
  return async () => {
    try {
      console.log('Logout ');

      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'auth', payload: null });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Logout Error' });
    }
  };
};

const registerUser = (dispatch) => {
  return async ({ email, username, password, confirmPassword }) => {
    try {
      fetch('https://vast-beach-48711.herokuapp.com/api/register', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          console.log('Success:', data);
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });

      // const response = await api.post(
      //   'https://vast-beach-48711.herokuapp.com/api/register',
      //   {
      //     email: email,
      //     username: username,
      //     password: password,
      //     confirmPassword: confirmPassword,
      //   },
      // );

      // await AsyncStorage.setItem('token', response.data.token);
      // dispatch({ type: 'auth', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Sign Up Error' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    registerUser,
    logout,
  },
  { token: null, errorMessage: '' },
);
