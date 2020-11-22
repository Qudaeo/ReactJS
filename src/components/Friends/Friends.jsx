const Friends = (props) => {
    let userElements = props.friends.map(u => <div>{u.name}</div>)

    return (
        <div>
            {userElements}
        </div>
    )
}

export default Friends