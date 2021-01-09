export const initialAuth = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

export type AuthType = typeof initialAuth

export type PhotosType = {
    large: string
    small: string
}

export type UserType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
    isMyMessage: boolean
}