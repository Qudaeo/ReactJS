import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <img src="https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg" alt=""/>
            <NavLink to={"/dialogs/" + props.userId}>{props.userName}</NavLink>
        </div>
    )
}

export default DialogItem