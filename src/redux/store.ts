import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer"

type PropertyType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends {[key: string]: (...arg:any) => any}> = ReturnType<PropertyType<T>>

const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

// @ts-ignore
window.__store__ = store

export default store