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

    let userData = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Pavel'},
        {id: 3, name: 'Yana'},
        {id: 4, name: 'Sasha'}
    ]

    let messageData = [
        {id: 1, message: 'hey'},
        {id: 2, message: 'yo'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'}
    ]

    let userElements = userData.map(u => <DialogItem userId={u.id} userName={u.name}/>)

    let messageElements = messageData.map(m => <MessageItem message={m.message}/>)

    return (
        <div className={s.Dialogs}>
            <div className={s.dialogItems}>
                {userElements}
                {/*              <DialogItem userId={userData[0].id} userName={userData[0].name} />
                <DialogItem userId={userData[1].id} userName={userData[1].name} />
                <DialogItem userId={userData[2].id} userName={userData[2].name} />*/}
            </div>
            <div className={s.messages}>
                {messageElements}
                {/*                <MessageItem message={messageData[0].message} />
                <MessageItem message={messageData[1].message} />
                <MessageItem message={messageData[2].message} />*/}
            </div>
        </div>
    )
}

export default Dialogs