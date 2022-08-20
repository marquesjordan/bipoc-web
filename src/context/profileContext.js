import api from '../api';
import createDataContext from './createDataContext';
import Cookies from 'universal-cookie';

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'profile':
      return { ...state, errorMessage: '', profile: action.payload };
    default:
      return state;
  }
};

const updateProfile = (dispatch) => {
  return async (values) => {
    console.log(values);
    try {
      console.log(values);
      const response = await api.put('/api/profile', values, {});

      console.log('Profile Update ', response.data);
      dispatch({ type: 'profile', payload: response.data.profile });
    } catch (err) {
      console.log('Error ', err);
      dispatch({ type: 'add_error', payload: 'Update Profile Error' });
    }
  };
};

const getProfile = (dispatch) => {
  return async () => {
    const cookies = new Cookies();

    const token = cookies.get('token');
    console.log('TOKEN ', cookies);
    try {
      const response = await api.get('/api/profile', {
        headers: { Authorization: token },
      });

      console.log('Profile GET ', response.data);
      dispatch({ type: 'profile', payload: response.data.profile });
    } catch (error) {
      console.log('Profile ', error);
      dispatch({ type: 'add_error', payload: 'Get Profile Error' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  profileReducer,
  {
    updateProfile,
    getProfile,
  },
  { profile: {}, errorMessage: '' },
);
