import createDataContext from '../context/createDataContext';
import api from './../api';
import Cookies from 'universal-cookie';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'register':
      const { user, profile, token } = action.payload;
      console.log('REG ', action.payload);
      return {
        ...state,
        errorMessage: '',
        user: user._id,
        profile: profile._id,
        token: token,
      };
    case 'auth':
      return { ...state, errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const verify = (dispatch) => {
  return async (token) => {
    const response = await api.post('/api/verify', {
      token,
    });

    console.log('CONTE ', response);
    dispatch({ type: 'auth', payload: response.data });
  };
};

const logout = (dispatch) => {
  return async (callback) => {
    try {
      console.log('Logout ');
      const cookies = new Cookies();

      cookies.remove('token');

      dispatch({ type: 'auth', payload: null });

      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Logout Error' });
    }
  };
};

const registerUser = (dispatch) => {
  return async (data, callback) => {
    const { email, name, password, confirmPassword } = data;
    try {
      const response = await api.post('/api/register', {
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      });

      const cookies = new Cookies();

      cookies.set('token', response.data.token);

      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'register', payload: response.data });

      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Sign Up Error' });
    }
  };
};

const loginUser = (dispatch, callback) => {
  return async (data, callback) => {
    const { email, password } = data;
    try {
      const response = await api.post('/api/login', {
        email: email,
        password: password,
      });
      const cookies = new Cookies();

      cookies.set('token', response.data.token);

      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'auth', payload: response.data.token });

      if (callback) {
        callback();
      }
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
    verify,
  },
  { token: null, errorMessage: '' },
);
