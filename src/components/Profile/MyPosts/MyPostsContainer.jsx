import React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {

//    let state = props.store.getState().profilePage



    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState().profilePage

                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                const updatePostText = (text) => {
                    store.dispatch(updatePostTextActionCreator(text))
                }

                return <MyPosts
                    posts={state.posts}
                    newPostText={state.newPostText}
                    addPost={addPost}
                    updatePostText={updatePostText}
                />
            }
            }
        </StoreContext.Consumer>
    )

}
export default MyPostsContainer;