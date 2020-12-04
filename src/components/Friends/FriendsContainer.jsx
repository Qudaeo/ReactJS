import Friends from "./Friends";
import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC} from "../../redux/friendsReducer";

let mapStateToProps = (state) => {
    return {
        users: state.friendsPage.users
    }
}

let mapDispatchToProps = (dispatch) => ({
    follow: (userId) => dispatch(followAC(userId)),
    unfollow: (userId) => dispatch(unfollowAC(userId)),
    setUsers: (users) => dispatch(setUsersAC(users))
})

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer