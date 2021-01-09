import {Redirect} from "react-router";
import {Field, reduxForm} from "redux-form";
import styles from "./Login.module.css"
import {Input} from "../common/FormControls/FormControl";
import {required} from "../../utils/validators";

const LoginForm = ({captchaURL, handleSubmit, error}) => {

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

const LoginReduxForm = reduxForm(
    {
        form: 'login'
    }
)(LoginForm)

const Login = ({isAuth, captchaURL, login}) => {
    const onSubmit = formData => {
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

export default Login