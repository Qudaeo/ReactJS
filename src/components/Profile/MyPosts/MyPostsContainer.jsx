import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

/*
const MyPostsContainer = (props) => {
//    let state = props.store.getState().profilePage
    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState().profilePage

                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                const updatePostText = (text) => {
                    store.dispatch(updatePostTextActionCreator(text))
                }

                return <MyPosts
                    posts={state.posts}
                    newPostText={state.newPostText}
                    addPost={addPost}
                    updatePostText={updatePostText}
                />
            }
            }
        </StoreContext.Consumer>
    )

}
 */

let mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

let mapDispatchToProps = (dispatch) => ({
    addPost: () => {
        dispatch(addPostActionCreator())
    },
    updatePostText: (text) => {
        dispatch(updatePostTextActionCreator(text))
    }
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;