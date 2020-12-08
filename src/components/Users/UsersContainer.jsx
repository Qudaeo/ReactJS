import React from "react";
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageUsersSize}&page=${this.props.currentPage}`)
            .then(response => {

                this.props.setUsers(response.data.items, response.data.totalCount)
            })
    }

    onChangePage=(pageNumber)=>{
        this.props.setCurrentPage(pageNumber)
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageUsersSize}&page=${pageNumber}`)
            .then(response => {

                this.props.setUsers(response.data.items, response.data.totalCount)
            })
    }

    render() {
        return <Users
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageUsersSize={this.props.pageUsersSize}
            currentPage={this.props.currentPage}

            onChangePage={this.onChangePage}
            follow={(userId) => this.props.follow(userId)}
            unfollow={(userId) => this.props.unfollow(userId)}
        />
    }
}

let mapStateToProps = (state) => ({
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageUsersSize: state.usersPage.pageUsersSize
})

let mapDispatchToProps = (dispatch) => ({
    follow: (userId) => dispatch(followAC(userId)),
    unfollow: (userId) => dispatch(unfollowAC(userId)),
    setUsers: (users, totalUsersCount) => dispatch(setUsersAC(users, totalUsersCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)