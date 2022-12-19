import axios from '@/api/axios';

const getPopularTags = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getPopularTags,
};
