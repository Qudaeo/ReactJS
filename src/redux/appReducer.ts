import {getAuthMe} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "./store";

const SET_INITIALIZED = 'APP/Set_Initialized';

const initialAppReducer = {
    initialized: false
}

export type InitializeAppType = typeof initialAppReducer

type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}

const appReducer = (state = initialAppReducer, action: SetInitializedActionType): InitializeAppType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return ({
                ...state,
                initialized: true
            })

        default:
            return state
    }
}

const setInitialized = (): SetInitializedActionType => ({type: SET_INITIALIZED});

type ThunkType = ThunkAction<void, RootStateType, unknown, SetInitializedActionType>

export const initialize = (): ThunkType => (dispatch) => {
    const promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(setInitialized())
    )
}

export default appReducer