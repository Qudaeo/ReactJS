import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addMessage, addPost, updateMessageText, updatePostText} from './redux/state'
import {BrowserRouter} from "react-router-dom";

export let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                     addMessage={addMessage}
                     updateMessageText={updateMessageText}
                     addPost={addPost}
                     updatePostText={updatePostText}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}