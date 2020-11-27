const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageTextActionCreator = (text) => ({type: UPDATE_MESSAGE_TEXT, newMessageText: text});
export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newPostText: text});

let store = {
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hey, how are you?', likesCount: 3},
                {id: 2, message: 'It\'s my first post!', likesCount: 10},
                {id: 3, message: 'yo yo yo', likesCount: 1},
                {id: 4, message: 'DADA', likesCount: 0}
            ],
            newPostText: ''
        },

        navbarPage: {
            friends: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Pavel'},
                {id: 3, name: 'Yana'}
            ]
        },
    },
    _renderEntireTree() {
        console.log('No subscribers!')
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._renderEntireTree = observer
    },

    dispatch(action) {
        if (action.type === ADD_MESSAGE) {
            let newPostElement = {
                id: 6,
                message: this._state.dialogsPage.newMessageText,
                isMyMessage: true
            }
            this._state.dialogsPage.messages.push(newPostElement)
            this._state.dialogsPage.newMessageText = ''
            this._renderEntireTree(this._state)
        } else if (action.type === UPDATE_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._renderEntireTree(this._state)
        } else if (action.type === ADD_POST) {
            let newMessageElement = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newMessageElement)
            this._state.profilePage.newPostText = ''
            this._renderEntireTree(this._state)
        } else if (action.type === UPDATE_POST_TEXT) {
            this._state.profilePage.newPostText = action.newPostText
            this._renderEntireTree(this._state)
        }
    }

}

window.store = store

export default store;