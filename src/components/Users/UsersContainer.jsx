import React from 'react';
import {connect} from 'react-redux';
import {follow, getUsers, unfollow} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageUsersSize: state.usersPage.pageUsersSize,
    isFetchingUsers: state.usersPage.isFetchingUsers,
    followingInProcessing: state.usersPage.followingInProcessing
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, getUsers})
)(UsersContainer)