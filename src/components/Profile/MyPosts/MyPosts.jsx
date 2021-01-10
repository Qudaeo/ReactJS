import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControls/FormControl";
import {maxLength, required} from "../../../utils/validators";

const maxLength250 = maxLength(250)

const AddNewPost = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength250]} name='newPostText'
                       placeholder='Enter your post'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'newPost'})(AddNewPost)

const MyPosts = props => {
    const postElements = [...props.posts].reverse().map(
        p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const addPost = values => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={styles.myPosts}>

            <h3>my posts</h3>
            <AddNewPostReduxForm onSubmit={addPost}/>
            {postElements}
        </div>
    )
}
export default MyPosts;