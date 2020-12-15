import React from "react";
import styles from './Users.module.css'
import userNoPhoto from '../../assets/images/userNoPhoto.png'
import {NavLink} from "react-router-dom";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageUsersSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesBreak = null

    return (
        <div>
            <div>
                {
                    pages.map(p => <span key={p} onClick={() => props.onChangePage(p)}
                                      className={(props.currentPage === p) ? styles.selectedPage : ''}>
                    {
                        (p < 4 || Math.abs(props.currentPage - p) < 3 || (pages.length - p < 3))
                        ? ((pagesBreak = true) && p + ' ')
                        : (pagesBreak ? (!(pagesBreak = false) && ('... ')) : '')
                    }
                </span>)}
            </div>
            {props.users.map(u => {
                return (
                    <div key={u.id}>
                        <NavLink to={`/profile/${u.id}`}>
                            <img
                                className={styles.userAva}
                                src={u.photos.small != null ? u.photos.small : userNoPhoto}
                                alt=''/>
                        </NavLink>
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
                            ? <button
                                disabled={props.followingInProcessing.includes(u.id)}
                                onClick={() => props.unfollow(u.id)}>Unfollow</button>
                            : <button
                                disabled={props.followingInProcessing.includes(u.id)}
                                onClick={() => props.follow(u.id)}>Follow</button>}
                    </div>
                )
            })}
        </div>
    )
}

export default Users