import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";
import {FC} from "react";
import {UserType} from "../../types/types";

type UsersMapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageUsersSize: number
    currentPage: number
    isFetchingUsers: boolean
    followingInProcessing: Array<number>
    pageTitle:string
}

type UsersMapDispatchToPropsType = {
    onChangePage: (pageNumber: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type PropsType = UsersMapStateToPropsType & UsersMapDispatchToPropsType

const Users: FC<PropsType> = ({
                                  users, totalUsersCount, pageUsersSize,
                                  currentPage, onChangePage, isFetchingUsers,
                                  followingInProcessing, pageTitle, follow, unfollow
                              }) => {

    return (
        <div>
            <h2>{pageTitle}</h2>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageItemsSize={pageUsersSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />

            {isFetchingUsers && <Preloader/>}

            <div>
                {
                    users.map(user => <User key={user.id} user={user}
                                            followingInProcessing={followingInProcessing}
                                            follow={follow} unfollow={unfollow}/>)
                }
            </div>
        </div>
    )
}

export default Users