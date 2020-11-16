import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post";

let postData = [
    {id: 1, message: 'Hey, how are you?', likesCount: 3},
    {id: 2, message: 'It\'s my first post!', likesCount: 10},
    {id: 3, message: 'yo yo yo', likesCount: 1},
    {id: 4, message: 'DADA', likesCount: 0}
]

let postElements = postData.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

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
                {postElements}

                {/*                <Post message={postData[0].message} likesCount={postData[0].likesCount}/>
                <Post message={postData[1].message} likesCount={postData[1].likesCount}/>
                <Post message={postData[2].message} likesCount={postData[2].likesCount}/>*/}
            </div>
        </div>
    )
}
export default MyPosts;