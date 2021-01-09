import { Component } from 'react';
import {connect} from 'react-redux';
import {follow, requestUsers, unfollow} from '../../redux/usersReducer';
import Users from './Users';
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProcessing,
    getIsFetchingUsers,
    getPageUsersSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";

class UsersContainer extends Component {
    componentDidMount() {
        let {users, pageUsersSize, currentPage, getUsers} = this.props
        if (users.length === 0) {
            getUsers(pageUsersSize, currentPage)
        }
    }

    onChangePage = pageNumber => {
        let {getUsers, pageUsersSize} = this.props
        getUsers(pageUsersSize, pageNumber)
    }

    render() {
        let {
            isFetchingUsers, users, totalUsersCount, pageUsersSize, currentPage,
            followingInProcessing, follow, unfollow
        } = this.props
        return <>
            <Users
                users={users}
                totalUsersCount={totalUsersCount}
                pageUsersSize={pageUsersSize}
                currentPage={currentPage}
                followingInProcessing={followingInProcessing}

                onChangePage={this.onChangePage}
                isFetchingUsers={isFetchingUsers}
                follow={(userId) => follow(userId)}
                unfollow={(userId) => unfollow(userId)}
            />
        </>
    }
}

let mapStateToProps = (state) => ({
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    pageUsersSize: getPageUsersSize(state),
    isFetchingUsers: getIsFetchingUsers(state),
    followingInProcessing: getFollowingInProcessing(state)
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)