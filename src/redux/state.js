import {renderEntireTree} from "../render";

let state = {
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
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: 'Hey, how are you?', likesCount: 3},
            {id: 2, message: 'It\'s my first post!', likesCount: 10},
            {id: 3, message: 'yo yo yo', likesCount: 1},
            {id: 4, message: 'DADA', likesCount: 0}
        ]
    },
    navbarPage: {
        friends: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Pavel'},
            {id: 3, name: 'Yana'}
        ]
    }
}

export let addMessage = (newMessage) => {
    let newPostElement = {
        id: 6,
        message: newMessage,
        isMyMessage: true
    }
    state.dialogsPage.messages.push(newPostElement)

    renderEntireTree(state)
}

export let addPost = (newPost) => {
    let newMessageElement = {
        id: 5,
        message: newPost,
        likesCount: 0
    }
    state.profilePage.posts.push(newMessageElement)

    renderEntireTree(state)
}

export default state;