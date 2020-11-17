import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let users = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Pavel'},
    {id: 3, name: 'Yana'},
    {id: 4, name: 'Sasha'}
]

let messages = [
    {id: 1, message: 'hey'},
    {id: 2, message: 'yo'},
    {id: 3, message: 'yo'},
    {id: 4, message: 'yo'},
    {id: 5, message: 'yo'}
]

let posts = [
    {id: 1, message: 'Hey, how are you?', likesCount: 3},
    {id: 2, message: 'It\'s my first post!', likesCount: 10},
    {id: 3, message: 'yo yo yo', likesCount: 1},
    {id: 4, message: 'DADA', likesCount: 0}
]

ReactDOM.render(
    <React.StrictMode>
        <App users={users} messages={messages} posts={posts}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
