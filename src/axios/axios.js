import axios from "axios";

const instance = axios.create({
    baseURL: "https://sheltered-wave-91250.herokuapp.com",
});

export default instance;