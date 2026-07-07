import axios from "axios";

const api = axios.create({
    // Add https:// prefix
    baseURL: "https://testpilot-apit-geagb9dqgpbpcthx.southeastasia-01.azurewebsites.net"
});

export default api;