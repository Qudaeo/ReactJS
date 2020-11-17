import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {

    let userElements = props.users.map(u => <DialogItem userId={u.id} userName={u.name}/>)
    let messageElements = props.messages.map(m => <MessageItem message={m.message}/>)

    return (
        <div className={s.Dialogs}>
            <div className={s.dialogItems}>
                {userElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    )
}

export default Dialogs