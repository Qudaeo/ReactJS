import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.userId}>{props.userName}</NavLink>
        </div>
    )
}

const MessageItem = (props) => {
    return <div>{props.message}</div>
}

const Dialogs = () => {
    return (
        <div className={s.Dialogs}>
            <div className={s.dialogItems}>
                <DialogItem userId="1" userName='Dimych'/>
                <DialogItem userId="2" userName='Pavel'/>
                <DialogItem userId="3" userName='Yana'/>
            </div>
            <div className={s.messages}>
                <MessageItem message="hey"/>
                <MessageItem message="yo"/>
                <MessageItem message="yo"/>
            </div>
        </div>
    )
}

export default Dialogs