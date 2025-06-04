import api, { makeRequest } from "./makeRequest"

export const login = (req) => {
    return api.post("/admin/login", req)
}

export const logout = () => {
    return api.post("/admin/logout");
}
