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
      const response = await api.post(
        'https://vast-beach-48711.herokuapp.com/api/register',
        {
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        },
      );

      console.log('REPSONSE ', response);

      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'auth', payload: response.data.token });
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
