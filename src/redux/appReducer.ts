import {getAuthMe} from "./authReducer";

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

export const initialize = () => (dispatch: any) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(setInitialized())
    )
}

export default appReducer