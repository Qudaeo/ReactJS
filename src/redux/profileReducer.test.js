import profileReducer, {addPost, deletePost} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ]
}

test('reducer addPost - length new posts should be 5', () => {
    let action = addPost("new post")
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(5)
});

test('reducer addPost - new post message should be correct', () => {
    let action = addPost("new post")
    let new_state = profileReducer(state, action)
    expect(new_state.posts[4].message).toBe("new post")
});

test('reducer deletePost - length new posts should be 3', () => {
    let action = deletePost(2)
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(3)
});

test('reducer deletePost - length new posts should not change, if postId incorrect', () => {
    let action = deletePost(1000)
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(4)
});