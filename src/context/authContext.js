import createDataContext from '../context/createDataContext';
import axios from 'axios';
import api from './../api';

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
  return async ({ email, name, password, confirmPassword }) => {
    try {
      const response = await api.post('/api/register', {
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      });

      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'auth', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Sign Up Error' });
    }
  };
};

const loginUser = (dispatch) => {
  return async ({ email, password }) => {
    console.log('EMAIL ', email);
    console.log('PASSWORD ', password);
    try {
      const response = await api.post('/api/login', {
        email: email,
        password: password,
      });

      console.log('RES ', response);
      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'auth', payload: response.data.token });
    } catch (err) {
      console.log('ERROR ', err);
      dispatch({ type: 'add_error', payload: 'Sign In Error' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    registerUser,
    loginUser,
    logout,
  },
  { token: null, errorMessage: '' },
);
