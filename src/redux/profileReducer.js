const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) =>
    ({type: UPDATE_POST_TEXT, newPostText: text});

let initialProfilePage = {
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ],
    newPostText: ''
}

const profileReducer = (state = initialProfilePage, action) => {
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