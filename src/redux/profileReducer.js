const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) =>
    ({type: UPDATE_POST_TEXT, newPostText: text});

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            let newMessageElement = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newMessageElement)
            state.newPostText = ''

            return state
        case UPDATE_POST_TEXT:
            state.newPostText = action.newPostText

            return state
        default:
            return state
    }
}

export default profileReducer