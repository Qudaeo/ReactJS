import {getAuthMe} from "./authReducer";

const SET_INITIALIZED = '/app/SET_INITIALIZED';

let initialAuthReducer = {
    initialized: false
}

const appReducer = (state = initialAuthReducer, action) => {
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

export const initialize = () => (dispatch) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(setInitialized())
    )
}

export default appReducer