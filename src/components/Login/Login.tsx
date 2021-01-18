import {Redirect} from "react-router";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "./Login.module.css"
import {Input} from "../common/FormControls/FormControl";
import {required} from "../../utils/validators";
import {FC} from "react";
import {RootStateType} from "../../redux/store";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";

type LoginFormOwnPropsType = {
    captchaURL: string | null
}

const LoginForm:FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({captchaURL, handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
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
            {(captchaURL) && <div>
                <img src={captchaURL} alt=''/>
                <div className={styles.inputElement}>
                    <Field component={Input} validate={[required]} name='captcha'
                           placeholder='captcha'/>
                </div>
            </div>
            }
            {error && <div className={styles.divError}>
                {error}
            </div>}
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>(
    {
        form: 'login'
    }
)(LoginForm)

type MapStateToPropsType = {
    isAuth: boolean
    captchaURL: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email:string
    password:string
    rememberMe:boolean
    captcha:string
}

const Login: FC<MapStateToPropsType & MapDispatchToPropsType> = ({isAuth, captchaURL, login}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) return <Redirect to='/profile'/>

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm captchaURL={captchaURL} onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, null, RootStateType>(
    mapStateToProps, {login}
)(Login)