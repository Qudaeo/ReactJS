import {Component} from 'react'
import {connect} from 'react-redux'
import {follow, requestUsers, unfollow} from '../../redux/usersReducer'
import Users from './Users'
import {compose} from "redux"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import {
    getCurrentPage,
    getFollowingInProcessing,
    getIsFetchingUsers,
    getPageUsersSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors"
import {UserType} from "../../types/types"
import {RootStateType} from "../../redux/store"

type UsersMapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageUsersSize: number
    currentPage: number
    isFetchingUsers: boolean
    followingInProcessing: Array<number>
}

type UsersMapDispatchToPropsType = {
    getUsers: (pageNumber: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnProps = {
    pageTitle: string
}

type PropsType = UsersMapStateToPropsType & UsersMapDispatchToPropsType & OwnProps

class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        const {users, pageUsersSize, currentPage, getUsers} = this.props
        if (users.length === 0) {
            getUsers(currentPage, pageUsersSize)
        }
    }

    onChangePage = (pageNumber: number) => {
        let {getUsers, pageUsersSize} = this.props
        getUsers(pageNumber, pageUsersSize)
    }

    render() {
        const {
            isFetchingUsers, users, totalUsersCount, pageUsersSize, currentPage,
            followingInProcessing, pageTitle, follow, unfollow
        } = this.props
        return <>
            <Users
                users={users}
                totalUsersCount={totalUsersCount}
                pageUsersSize={pageUsersSize}
                currentPage={currentPage}
                followingInProcessing={followingInProcessing}

                pageTitle={pageTitle}

                onChangePage={this.onChangePage}
                isFetchingUsers={isFetchingUsers}
                follow={(userId) => follow(userId)}
                unfollow={(userId) => unfollow(userId)}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType): UsersMapStateToPropsType => ({
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    pageUsersSize: getPageUsersSize(state),
    isFetchingUsers: getIsFetchingUsers(state),
    followingInProcessing: getFollowingInProcessing(state)
})

export default compose(
    withAuthRedirect,
    connect<UsersMapStateToPropsType, UsersMapDispatchToPropsType, OwnProps, RootStateType>(
        mapStateToProps, {follow, unfollow, getUsers: requestUsers}
    )
)(UsersContainer)