import axios from 'axios';

const apiPlaySgm = axios.create({
  baseURL: 'http://15.235.33.235/api/',
});

export default apiPlaySgm;
