import axios from 'axios';

export const fetchImages = async ({ value, page }) =>
  await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42682169-5194f534d6ac320016f3b6be7',
      q: value,
      image_type: 'photo',
      pretty: true,
      page,
      per_page: 15,
    },
  });
