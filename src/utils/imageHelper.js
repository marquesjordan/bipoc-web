import api from '../api';
import keys from '../config/keys';

const imageHelper = {
  fetchImage: async (key) => {
    const response = await api.get(`${keys.HOST}/api/images/${key}`);
    console.log('Fetxgt ', response);
  },

  postImage: async (data) => {
    var formData = new FormData();
    for (const key in data) {
      formData.append(`${key}`, data[key]);
    }
    const response = await api.post('/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('IMAGE ', response.data);
    return response.data;
  },
};

export default imageHelper;
