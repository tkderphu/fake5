import axios from "axios";
import { getAccessToken } from "../utils/token";
export const BASE_URL = "http://localhost:8081/api"
const api = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
    headers: {
        "Authorization": `Bearer ${getAccessToken()}`
    }
})

export default api

// // api("", {method: "post", data: {}})

// export async function makeRequest(url, options) {
//     return api(url, options)
//       .then(res => res.data)
//       .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
//   }