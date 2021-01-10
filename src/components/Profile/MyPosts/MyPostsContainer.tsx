import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostType} from "../../../types/types";
import {RootStateType} from "../../../redux/store";

type MapStateToPropsType = {
    posts: Array<PostType>
}

type MapDispatchToPropsType = {
    addPost: (newPost: string) => void
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    posts: state.profilePage.posts
})

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, null, RootStateType>(
    mapStateToProps, {addPost}
)(MyPosts)

export default MyPostsContainer;