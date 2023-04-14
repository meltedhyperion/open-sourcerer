import axios from "axios";


export const https = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
    },
})