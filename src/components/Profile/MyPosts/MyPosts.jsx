import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.myPosts}>

            <h3>my posts</h3>
            <div>
                <div>
                    <textarea/>
                </div>
                <div>
                    <button>Add post</button>
                </div>

                <Post message='Hey, how are you?' likesCount='3'/>
                <Post message='It&#39;s my first post!' likesCount='10'/>
            </div>
        </div>
    )
}
export default MyPosts;