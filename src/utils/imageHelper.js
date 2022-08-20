import api from '../api';

const imageHelper = {
  fetchImage: async (key) => {
    const response = await api.get(
      `${process.env.REACT_APP_PHOTO_HOST_URL}/api/images/${key}`,
    );
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
