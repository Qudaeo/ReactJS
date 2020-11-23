let renderEntireTree = () => {
    console.log('The state was changed!')
}

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
    }
}

window.state = state

export const addMessage = () => {
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
}

export default state;