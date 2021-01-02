import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
                   users, totalUsersCount, pageUsersSize, currentPage,
                   onChangePage, followingInProcessing, follow, unfollow
               }) => {

    return (
        <div>
            <Paginator
                totalUsersCount={totalUsersCount}
                pageUsersSize={pageUsersSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
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