import s from './MessageItem.module.css'

const MessageItem = (props) => {
    return <div className={props.isMyMessage ? s.myMessage : s.friendMessage}>{props.message}</div>
}

export default MessageItem