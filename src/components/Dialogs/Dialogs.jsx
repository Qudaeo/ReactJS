import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.addMessage()
    }

    let updateMessageText = () => {
        let text = newMessageElement.current.value
        props.updateMessageText(text)
    }

    let userElements = props.state.users.map(u => <DialogItem userId={u.id} userName={u.name}/>)
    let messageElements = props.state.messages.map(m => <MessageItem message={m.message} isMyMessage={m.isMyMessage}/>)

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
                    <textarea ref={newMessageElement}
                              onChange={updateMessageText}
                              value={props.state.newMessageText}/>
                </div>
                <div>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs