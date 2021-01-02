const ADD_MESSAGE = '/dialogs/ADD_MESSAGE';

let initialDialogPage = {
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

const dialogsReducer = (state = initialDialogPage, action) => {
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

export const addMessage = newMessageText => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer