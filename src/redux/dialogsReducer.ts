const ADD_MESSAGE = 'DIALOGS/AddMessage';

type UserType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
    isMyMessage: boolean
}

type InitialDialogType = {
    users: Array<UserType>
    messages: Array<MessageType>
}

const initialDialogPage: InitialDialogType = {
    users: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Pavel'},
        {id: 3, name: 'Yana'},
        {id: 4, name: 'Sasha'}
    ],
    messages: [
        {id: 1, message: 'hey', isMyMessage: false},
        {id: 2, message: 'yo', isMyMessage: true},
        {id: 3, message: 'yo', isMyMessage: false},
        {id: 4, message: 'yo', isMyMessage: true},
        {id: 5, message: 'yo', isMyMessage: false}
    ]
};

type ActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}

const dialogsReducer = (state = initialDialogPage, action: ActionType):InitialDialogType => {
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

export const addMessage = (newMessageText: string):ActionType => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer