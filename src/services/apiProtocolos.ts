import axios from 'axios';

const apiProtocolos = axios.create({
    baseURL: 'https://sprotocol.operadora.app.br'
})

export default apiProtocolos;