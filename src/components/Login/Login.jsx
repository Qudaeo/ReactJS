import React from 'react'
import {Redirect} from "react-router";
import {Field, reduxForm} from "redux-form";
import styles from './Login.module.css'
import {login} from "../../redux/authReducer";
import {Input} from "../common/FormControls/FormControl";
import {required} from "../../utils/validators";

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.inputElement}>
                <Field component={Input} validate={[required]} name='email'
                       placeholder='login'/>
            </div>
            <div className={styles.inputElement}>
                <Field component={Input} validate={[required]} name='password'
                       placeholder='password' type='password'/>
            </div>
            <div className={styles.inputElement}>
                <Field component='input' name='rememberMe' type='checkbox'/>remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = props => {

    const onSubmit = formData => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to='/profile'/>

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}

export default Login