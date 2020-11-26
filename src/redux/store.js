"use strict";

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


    getState() {
        return this._state
    },

    addMessage() {
        let newPostElement = {
            id: 6,
            message: this._state.dialogsPage.newMessageText,
            isMyMessage: true
        }
        this._state.dialogsPage.messages.push(newPostElement)
        this._state.dialogsPage.newMessageText = ''
        this._renderEntireTree(this._state)
    },

    updateMessageText(newMessageText) {
        this._state.dialogsPage.newMessageText = newMessageText
        this._renderEntireTree(this._state)
    },


    addPost() {
        let newMessageElement = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newMessageElement)
        this._state.profilePage.newPostText = ''
        this._renderEntireTree(this._state)
    },

    updatePostText(newPostText) {
        this._state.profilePage.newPostText = newPostText
        this._renderEntireTree(this._state)
    },

    _renderEntireTree() {
        console.log('No subscribers!')
    },

    subscribe(observer) {
        this._renderEntireTree = observer
    }

}


window.store = store

export default store;


/*export const addMessage = () => {
    let newPostElement = {
        id: 6,
        message: state.dialogsPage.newMessageText,
        isMyMessage: true
    }
    state.dialogsPage.messages.push(newPostElement)

    state.dialogsPage.newMessageText = ''

    renderEntireTree(state)

}

export const updateMessageText = (newMessageText) => {
    state.dialogsPage.newMessageText = newMessageText
    renderEntireTree(state)
}

export const addPost = () => {
    let newMessageElement = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newMessageElement)

    state.profilePage.newPostText = ''

    renderEntireTree(state)
}

export const updatePostText = (newPostText) => {

    state.profilePage.newPostText = newPostText

    renderEntireTree(state)
}

export const subscribe = (observer) => {
    renderEntireTree = observer
}*/
