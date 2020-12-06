import React from "react";
import styles from './Users.module.css'
import axios from "axios";
import userNoPhoto from '../../assets/images/userNoPhoto.png'

class Users extends React.Component {
    componentDidMount() {
        axios
            .get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => this.props.setUsers(response.data.items))
    }

    render() {
        return (
            <div>
                {this.props.users.map(u => {
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
                                ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Users