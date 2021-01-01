import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControls/FormControl";
import {maxLength, required} from "../../../utils/validators";

const maxLength250 = maxLength(250)

const AddNewPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength250]} name ='newPostText' placeholder='Enter your post'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'newPost'})(AddNewPost)

const MyPosts = (props) => {
    let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.myPosts}>

            <h3>my posts</h3>
            <AddNewPostReduxForm onSubmit={addPost}/>
            {postElements}
        </div>
    )
}
export default MyPosts;