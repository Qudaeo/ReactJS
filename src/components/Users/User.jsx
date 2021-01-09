import styles from './User.module.css'
import userNoPhoto from '../../assets/images/userNoPhoto.png'
import {NavLink} from "react-router-dom";

const User = ({user, followingInProcessing, follow, unfollow}) => {
    return (
        <div>
            <NavLink to={`/profile/${user.id}`}>
                <img
                    className={styles.userAva}
                    src={user.photos.small != null ? user.photos.small : userNoPhoto}
                    alt=''/>
            </NavLink>
            <div>
                {user.name}
            </div>
            <div>
                {user.status}
            </div>
            {user.followed
                ? <button
                    disabled={followingInProcessing.includes(user.id)}
                    onClick={() => unfollow(user.id)}>Unfollow</button>
                : <button
                    disabled={followingInProcessing.includes(user.id)}
                    onClick={() => follow(user.id)}>Follow</button>}
        </div>
    )
}

export default User