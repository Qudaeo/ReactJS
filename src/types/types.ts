export const initialAuth = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

export type AuthType = typeof initialAuth

export type HeaderPropsType = {
    auth: AuthType
    logout: () => void
}

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

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string | null
    userId: number
    photos: PhotosType
}