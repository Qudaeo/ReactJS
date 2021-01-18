import {getAuthMe} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {InferActionsType, RootStateType} from "./store";

const initialAppReducer = {
    initialized: false
}

export type InitializeAppType = typeof initialAppReducer

const appReducer = (state = initialAppReducer, action: ActionType): InitializeAppType => {
    switch (action.type) {
        case 'APP/Set_Initialized':
            return ({
                ...state,
                initialized: true
            })

        default:
            return state
    }
}

const action = {
    setInitialized: () => ({type: 'APP/Set_Initialized'})
}

type ActionType = InferActionsType<typeof action>

type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>

export const initialize = (): ThunkType => (dispatch) => {
    const promise = dispatch(getAuthMe())

    Promise.all([promise]).then(
        () => dispatch(action.setInitialized())
    )
}

export default appReducer