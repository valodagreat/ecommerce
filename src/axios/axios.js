import axios from "axios";

const instance = axios.create({
    baseURL: "https://my-eccomerce-backend.onrender.com",
});

export default instance;