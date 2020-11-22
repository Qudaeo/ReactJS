import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addMessage, addPost} from './redux/state'
import {BrowserRouter} from "react-router-dom";

export let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addMessage={addMessage} addPost={addPost}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}