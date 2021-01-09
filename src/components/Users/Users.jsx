import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";

const Users = ({
                   users, totalUsersCount, pageUsersSize, currentPage,
                   onChangePage, isFetchingUsers, followingInProcessing, follow, unfollow
               }) => {

    return (
        <div>
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