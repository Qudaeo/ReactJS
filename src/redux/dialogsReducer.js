const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageTextActionCreator = (text) =>
    ({type: UPDATE_MESSAGE_TEXT, newMessageText: text});

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newPostElement = {
                id: 6,
                message: state.newMessageText,
                isMyMessage: true
            }
            state.messages.push(newPostElement)
            state.newMessageText = ''

            return state
        case UPDATE_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText

            return state
        default:
            return state
    }
}

export default dialogsReducer