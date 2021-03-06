import axios from "axios";
import {AuthType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "26818ec0-b02b-4c09-944c-b4d6ca23fec0"}
})

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
}

type FollowResponseType = {
    data: Object
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: ResultCode
}

export const userAPI = {
    getUsers(currentPage: number, pageUsersSize: number) {
        return instance.get<GetUsersResponseType>(`users?count=${pageUsersSize}&page=${currentPage}`)
            .then(response => response.data)
    },

    setFollow(userId: number) {
        return instance.post<FollowResponseType>(`follow/` + userId)
            .then(response => response.data)
    },

    setUnfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/` + userId)
            .then(response => response.data)
    }
}

export enum ResultCode {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: AuthType
    resultCode: ResultCode
    messages: Array<string>
}
type LoginPostResponseType = {
    resultCode: ResultCode | ResultCodeCaptcha
    messages: Array<string>
    data: {
        id: number
    }
}
type LoginDeleteResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: Object
}
type CaptchaUrlGetResponseType = {
    url: string
}

export const authAPI = {
    getMe() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginPostResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logOut() {
        return instance.delete<LoginDeleteResponseType>(`auth/login`)
            .then(response => response.data)
    },
    getCaptchaURL() {
        return instance.get<CaptchaUrlGetResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    },

    uploadAvatarPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    putProfileData(profile: ProfileType) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    }
}