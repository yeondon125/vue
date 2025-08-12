import axios from "axios";

const api = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro",
  params: {
    key: import.meta.env.VITE_GEMINI_API_KEY,
  },
});

export default api;
