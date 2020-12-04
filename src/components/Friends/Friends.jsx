import styles from './Friends.module.css'


const Friends = (props) => {
    if (props.users.length === 0)
        props.setUsers([
            {
                id: 1,
                fullName: 'Dmitriy',
                userAva: 'http://www.clker.com/cliparts/3/m/v/Y/E/V/small-red-apple-md.png',
                status: 'I am boss',
                followed: false,
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                fullName: 'Andrew',
                userAva: 'http://www.clker.com/cliparts/3/m/v/Y/E/V/small-red-apple-md.png',
                status: 'I am boss too',
                followed: true,
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3,
                fullName: 'Sasha',
                userAva: 'http://www.clker.com/cliparts/3/m/v/Y/E/V/small-red-apple-md.png',
                status: 'I am boss too too',
                followed: false,
                location: {city: 'Kiev', country: 'Ukraine'}
            }

        ])

    return (
        <div>
            {props.users.map(u => {
                return (
                    <div key={u.id}>
                        <div>
                            <img className={styles.userAva} src={u.userAva} alt=''/>
                        </div>
                        <div>
                            {u.fullName}
                        </div>
                        <div>
                            {u.status}
                        </div>
                        <div>
                            {u.location.city}
                        </div>
                        <div>
                            {u.location.country}
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

export default Friends