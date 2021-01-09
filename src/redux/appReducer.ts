import {getAuthMe} from "./authReducer";

const SET_INITIALIZED = '/app/Set_Initialized';

type InitialAuthReducerType = {
    initialized:boolean
}

type ActionType = {
    type: typeof SET_INITIALIZED
}

const initialAuthReducer: InitialAuthReducerType = {
    initialized: false
}

const appReducer = (state = initialAuthReducer, action: ActionType) => {
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

const setInitialized = () => ({type: SET_INITIALIZED});

export const initialize = () => (dispatch: Function) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(setInitialized())
    )
}

export default appReducer