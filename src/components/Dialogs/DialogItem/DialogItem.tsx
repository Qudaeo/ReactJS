import styles from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    userId: number
    userName: string
}

const DialogItem= ({userId, userName}: PropsType) => {
    return (
        <div className={styles.dialog}>
            <img src="https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg" alt=""/>
            <NavLink to={"/dialogs/" + userId}>{userName}</NavLink>
        </div>
    )
}

export default DialogItem