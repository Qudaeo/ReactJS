const Friends = (props) => {
    let userElements = props.friends.map(u => <div key={u.id}>{u.name}</div>)

    return (
        <div>
            {userElements}
        </div>
    )
}

export default Friends