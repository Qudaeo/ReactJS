import {getAuthMe} from "./authReducer";

const SET_INITIALIZED = 'APP/Set_Initialized';

export type InitializeAppType = {
    initialized: boolean
}

const initialAppReducer: InitializeAppType = {
    initialized: false
}

type ActionType = {
    type: typeof SET_INITIALIZED
}

const appReducer = (state = initialAppReducer, action: ActionType): InitializeAppType => {
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

const setInitialized = (): ActionType => ({type: SET_INITIALIZED});

export const initialize = () => (dispatch: Function) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(setInitialized())
    )
}

export default appReducer