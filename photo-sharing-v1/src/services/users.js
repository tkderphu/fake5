import api, { makeRequest } from "./makeRequest"


export const getUsers = () => {
    return api.get("/user/list")
}
export const getUser = (id) => {
    return api.get("/user/" + id)
}

export const createUser = (req) => {
    return api.post("/user", req)
}