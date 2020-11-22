import s from './MessageItem.module.css'
import friendDialog from './image/friendDialog.png'
import myDialog from './image/myDialog.png'

const MessageItem = (props) => {
    return (
        <div className={props.isMyMessage ? s.myMessage : s.friendMessage}>
            <img src={props.isMyMessage ? myDialog : friendDialog} alt=""/>
            {props.message}
        </div>
    )
}

export default MessageItem