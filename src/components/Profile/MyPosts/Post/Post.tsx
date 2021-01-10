import s from './Post.module.css'
import {MessageType} from "../../../../types/types";
import {FC} from "react";

type PropsType = {
    message: MessageType
    likesCount: number
}

const Post: FC<PropsType> = ({message, likesCount}) => {
    return (
        <div className={s.item}>
            <img
                src={'https://static.mk.ru/upload/entities/2019/05/08/00/articles/detailPicture/c7/b5/08/6e/5dda626cb409b1fa6942c29040609e17.jpg'}
                alt=''
            />
            {message}
            <div>
                <span>like</span> {likesCount}
            </div>
        </div>
    )
}
export default Post;