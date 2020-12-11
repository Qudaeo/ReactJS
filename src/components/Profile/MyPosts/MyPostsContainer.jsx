import {addPost, updatePostText} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

/*let mapDispatchToProps = (dispatch) => ({
    addPost: () => {
        dispatch(addPostActionCreator())
    },
    updatePostText: (text) => {
        dispatch(updatePostTextActionCreator(text))
    }
})*/

const MyPostsContainer = connect(mapStateToProps, {addPost, updatePostText})(MyPosts)

export default MyPostsContainer;