import axios from "axios";
import API_KEY from "./apiKey";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": API_KEY}
})

export const userAPI = {
    getUsers(pageUsersSize, currentPage) {
        return instance.get(`users?count=${pageUsersSize}&page=${currentPage}`)
            .then(response => response.data)
    },

    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },

    setFollow(userId) {
        return instance.post(`follow/` + userId)
            .then(response => response.data)
    },

    setUnfollow(userId) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data)
    }
}

export const authAPI = {
    getMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}

