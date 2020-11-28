import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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

    callSubscriber(observer) {
        this._renderEntireTree = observer
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.navbarPage = navbarReducer(this._state.navbarPage, action)

        this._renderEntireTree(this._state)
    }
}

window.store = store

export default store;