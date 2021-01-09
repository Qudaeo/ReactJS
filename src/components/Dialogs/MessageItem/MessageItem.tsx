import styles from './MessageItem.module.css'
import friendDialog from './image/friendDialog.png'
import myDialog from './image/myDialog.png'

type PropsType = {
    isMyMessage: boolean
    message: string
}

const MessageItem = ({isMyMessage, message}: PropsType) => {
    return (
        <div className={isMyMessage ? styles.myMessage : styles.friendMessage}>
            <img src={isMyMessage ? myDialog : friendDialog} alt=""/>
            {message}
        </div>
    )
}

export default MessageItem