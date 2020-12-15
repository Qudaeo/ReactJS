import React from 'react'
import {Redirect} from "react-router";

const Login = (props) => {
    if (props.isAuth) return <Redirect to='/profile'/>
    return <h1>Login</h1>
}

export default Login