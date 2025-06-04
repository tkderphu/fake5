import api from "./makeRequest"

export const getPhotosOfUser = (userId) => {
    return api.get(`/photo/photosOfUser/${userId}`)
}

export const createComment = (photoId, comment) => {
    return api.post("/photo/commentsOfPhoto/" + photoId, {comment})
}
export const createPhoto = (formData) => {
    return api.post("/photo/posts/new", formData)
}