import axios from 'axios';

const apiPlayPj = axios.create({
    baseURL: 'https://sisdetalhes.operadora.app.br/'
})

export default apiPlayPj;