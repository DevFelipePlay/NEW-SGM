import axios from "axios";

const apiPlaySgm = axios.create({
  baseURL: "https://sistema.operadora.app.br/api/",
});

export default apiPlaySgm;
