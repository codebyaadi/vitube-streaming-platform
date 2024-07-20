import axios from "axios";

const api = axios.create({
    // Uncomment below line for Local Development
    // baseURL: "http://localhost:8080/api/v1",
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
