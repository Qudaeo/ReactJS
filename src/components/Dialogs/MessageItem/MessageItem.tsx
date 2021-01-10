import styles from './MessageItem.module.css'
import friendDialog from './image/friendDialog.png'
import myDialog from './image/myDialog.png'
import {FC} from "react";

type PropsType = {
    isMyMessage: boolean
    message: string
}

const MessageItem: FC<PropsType> = ({isMyMessage, message}) => {
    return (
        <div className={isMyMessage ? styles.myMessage : styles.friendMessage}>
            <img src={isMyMessage ? myDialog : friendDialog} alt=""/>
            {message}
        </div>
    )
}

export default MessageItem