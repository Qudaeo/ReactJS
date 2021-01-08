import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "26818ec0-b02b-4c09-944c-b4d6ca23fec0"}
})

export const userAPI = {
    getUsers(pageUsersSize, currentPage) {
        return instance.get(`users?count=${pageUsersSize}&page=${currentPage}`)
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
    },
    login(email, password, rememberMe, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    },
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    },

}


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    },

    uploadAvatarPhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    putProfileData(profile) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    }
}