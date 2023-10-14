import axios from "axios";

const api = axios.create({
    baseURL: "https://vitube-streaming-platform-xuot.vercel.app//api/v1",
})

export default api;