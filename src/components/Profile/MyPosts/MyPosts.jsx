import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return(
            <div>

                <div>my posts</div>
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                    <Post Message = 'Hey, how are you?' LikeCount = '3' />
                    <Post Message = 'It&#39;s my first post!'  LikeCount = '10' />
                </div>
            </div>
    )
}
export default MyPosts;