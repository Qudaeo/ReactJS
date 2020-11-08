import s from './Post.module.css'

const Post = (props) => {
    return (
         <div className={s.item}>
             <img src={'https://static.mk.ru/upload/entities/2019/05/08/00/articles/detailPicture/c7/b5/08/6e/5dda626cb409b1fa6942c29040609e17.jpg'}></img>
             {props.Message}
             <div>
                 <span>{props.LikeCount} likes</span>
             </div>
         </div>
    )
}
export default Post;