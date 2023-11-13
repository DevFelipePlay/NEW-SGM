import axios from 'axios';

const apiOperadora = axios.create({
    baseURL: 'https://consultas.portabilidadecelular.com/painel'
})

export default apiOperadora;