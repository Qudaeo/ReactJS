import React from 'react'
import {Redirect} from "react-router";
import {Field, reduxForm} from "redux-form";
import styles from './Login.module.css'
import {connect} from "react-redux";
import {postAuth} from "../../redux/authReducer";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.inputElement}>
                <Field component={'input'} name={'login'} placeholder={'login'}/>
            </div>
            <div className={styles.inputElement}>
                <Field component={'input'} name={'password'} placeholder={'password'}/>
            </div>
            <div className={styles.inputElement}>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'}/>remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.postAuth(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to='/profile'/>
    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}

export default connect(null, {postAuth})(Login)