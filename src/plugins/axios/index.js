import axios from "axios";

const instanse = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/',
});

export default instanse;