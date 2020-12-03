const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageTextActionCreator = (text) =>
    ({type: UPDATE_MESSAGE_TEXT, newMessageText: text});

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
    ],
    newMessageText: ''
};

const dialogsReducer = (state = initialDialogPage, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newPostElement = {
                id: 6,
                message: state.newMessageText,
                isMyMessage: true
            }
            return {
                ...state,
                messages: [...state.messages, newPostElement],
                newMessageText: ''
            }
        }
        case UPDATE_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newMessageText
            }
        }
        default:
            return state
    }
}

export default dialogsReducer