import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import App from './App';
import {BrowserRouter} from "react-router-dom";

let state = store.getState()

export const renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                     addMessage={store.addMessage.bind(store)}
                     updateMessageText={store.updateMessageText.bind(store)}
                     addPost={store.addPost.bind(store)}
                     updatePostText={store.updatePostText.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

store.subscribe(renderEntireTree)
renderEntireTree(state)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
