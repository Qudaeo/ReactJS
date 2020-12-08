import React from "react";
import styles from './Users.module.css'
import userNoPhoto from '../../assets/images/userNoPhoto.png'

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageUsersSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => <span key={p} onClick={() => props.onChangePage(p)}
                                      className={(props.currentPage === p)?styles.selectedPage:''}>{p}</span>)}
            </div>
            {props.users.map(u => {
                return (
                    <div key={u.id}>
                        <div>
                            <img
                                className={styles.userAva}
                                src={u.photos.small != null ? u.photos.small : userNoPhoto}
                                alt=''/>
                        </div>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                        <div>
                            {"u.location.city"}
                        </div>
                        <div>
                            {"u.location.country"}
                        </div>
                        {u.followed
                            ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={() => props.follow(u.id)}>Follow</button>}
                    </div>
                )
            })}
        </div>
    )
}


export default Users