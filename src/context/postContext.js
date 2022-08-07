import api from '../api';
import createDataContext from './createDataContext';
import Cookies from 'universal-cookie';

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'post':
      return { ...state, errorMessage: '', currentPost: action.payload };
    case 'posts':
      return { ...state, errorMessage: '', posts: action.payload };
    default:
      return state;
  }
};

const createPost = (dispatch) => {
  return async (values) => {
    console.log(values);
    try {
      const response = await api.post('/api/post', values, {});

      console.log('POST CREATE ', response);
      // await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'post', payload: response.data });
    } catch (err) {
      console.log('Error ', err);
      dispatch({ type: 'add_error', payload: 'Create Post Error' });
    }
  };
};

const getPosts = (dispatch) => {
  return async () => {
    const cookies = new Cookies();

    const token = cookies.get('token');
    console.log('TOKEN ', cookies);
    try {
      const response = await api.get('/api/posts', {
        headers: { Authorization: token },
      });

      console.log('POSTS GET');
      dispatch({ type: 'posts', payload: response.data });
    } catch (error) {
      console.log('POSTS ', error);
      dispatch({ type: 'add_error', payload: 'Get Posts Error' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  postReducer,
  {
    createPost,
    getPosts,
  },
  { currentPost: {}, posts: [], errorMessage: '' },
);
