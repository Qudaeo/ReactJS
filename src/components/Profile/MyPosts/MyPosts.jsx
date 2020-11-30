import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {
    //   let newPostElement = React.createRef();
    let postElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        props.addPost()
    }

    const updatePostText = (e) => {
        let text = e.target.value; //newPostElement.current.value
        props.updatePostText(text)
    }

    return (
        <div className={s.myPosts}>

            <h3>my posts</h3>
            <div>
                <textarea
                    //            ref={newPostElement}
                    onChange={updatePostText}
                    placeholder='Enter your post'
                    value={props.newPostText}/>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts;