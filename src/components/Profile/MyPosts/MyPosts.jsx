import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/store";

const MyPosts = (props) => {
    let newPostElement = React.createRef();
    let postElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const updatePostText = () => {
        let text = newPostElement.current.value
        props.dispatch(updatePostTextActionCreator(text))
    }

    return (
        <div className={s.myPosts}>

            <h3>my posts</h3>
            <div>
                <textarea ref={newPostElement} onChange={updatePostText} value={props.newPostText}/>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts;