import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return(
            <div>

                <div>my posts</div>
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
    )
}
export default MyPosts;