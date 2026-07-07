import axios from "axios";

const api = axios.create({
    // Add https:// prefix
    baseURL: "https://testpilot-api-haf3hkfscvc3frg4.southeastasia-01.azurewebsites.net"
});

export default api;