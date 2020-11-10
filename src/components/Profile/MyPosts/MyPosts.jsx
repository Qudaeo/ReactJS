import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return(
            <div>

                <div>my posts</div>
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                    <Post message = 'Hey, how are you?' likesCount = '3' />
                    <Post message = 'It&#39;s my first post!'  likesCount = '10' />
                </div>
            </div>
    )
}
export default MyPosts;