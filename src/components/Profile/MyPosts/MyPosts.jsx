import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {
    let newPostElement = React.createRef();

    let postElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        alert(newPostElement.current.value)
    }

    return (
        <div className={s.myPosts}>

            <h3>my posts</h3>
            <div>
                <textarea ref={newPostElement}/>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts;