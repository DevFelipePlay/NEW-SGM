import axios from 'axios';

const apiPlay = axios.create({
    baseURL: 'https://sistema.playmovel.com.br'
})

export default apiPlay;