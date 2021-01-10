import {MessageType, UserType} from "../types/types";

const ADD_MESSAGE = 'DIALOGS/AddMessage';

const initialDialogPage = {
    users: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Pavel'},
        {id: 3, name: 'Yana'},
        {id: 4, name: 'Sasha'}
    ] as Array<UserType>,
    messages: [
        {id: 1, message: 'hey', isMyMessage: false},
        {id: 2, message: 'yo', isMyMessage: true},
        {id: 3, message: 'yo', isMyMessage: false},
        {id: 4, message: 'yo', isMyMessage: true},
        {id: 5, message: 'yo', isMyMessage: false}
    ] as Array<MessageType>,
    newMessageText: ''
}

type InitialDialogType = typeof initialDialogPage

type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}

const dialogsReducer = (state = initialDialogPage, action: AddMessageActionType): InitialDialogType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newPostElement = {
                id: 6,
                message: action.newMessageText,
                isMyMessage: true
            }
            return {
                ...state,
                messages: [...state.messages, newPostElement]
            }
        }
        default:
            return state
    }
}

export const addMessage = (newMessageText: string): AddMessageActionType =>
    ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer