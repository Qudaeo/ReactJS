const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';

let initialFriendsPage = {
    users: [],
    currentPage: 1,
    totalUsersCount: 0,
    pageUsersSize: 100
}

const usersReducer = (state = initialFriendsPage, action) => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return {...u, followed: true}
                    else
                        return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return {...u, followed: false}
                    else
                        return u
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users,
                totalUsersCount: action.totalUsersCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        default:
            return state
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users, totalUsersCount) => ({type: SET_USERS, users, totalUsersCount});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export default usersReducer