import React from 'react';
import {connect} from 'react-redux';
import {follow, requestUsers, unfollow} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
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

class UsersContainer extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0)
            this.props.getUsers(this.props.pageUsersSize, this.props.currentPage)
    }

    onChangePage = (pageNumber) => this.props.getUsers(this.props.pageUsersSize, pageNumber)

    render() {
        return <>
            {this.props.isFetchingUsers && <Preloader/>}

            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageUsersSize={this.props.pageUsersSize}
                currentPage={this.props.currentPage}
                followingInProcessing={this.props.followingInProcessing}

                onChangePage={this.onChangePage}
                follow={(userId) => this.props.follow(userId)}
                unfollow={(userId) => this.props.unfollow(userId)}
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