import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Redirect} from "react-router";

const Dialogs = (props) => {
    let userElements = props.users.map(u => <DialogItem
        key={u.id}
        userId={u.id}
        userName={u.name}/>)

    let messageElements = props.messages.map(m => <MessageItem
        key={m.id}
        message={m.message}
        isMyMessage={m.isMyMessage}/>)

    let addMessage = () => {
        props.addMessage()
    }

    let updateMessageText = (e) => {
        let text = e.target.value
        props.updateMessageText(text)
    }

    if (!props.isAuth) return <Redirect to='/login' />

    return (
        <div>
            <div className={s.Dialogs}>
                <div>
                    {userElements}
                </div>
                <div className={s.messages}>
                    {messageElements}
                </div>
            </div>
            <div className={s.addMessage}>
                <div>
                    <textarea
                        onChange={updateMessageText}
                        placeholder='Enter your message'
                        value={props.newMessageText}/>
                </div>
                <div>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs