import {connect} from "react-redux";
import Login from "./Login";
import {login} from "../../redux/authReducer";
import {RootStateType} from "../../redux/store";

type MapStateToPropsType = {
    isAuth: boolean
    captchaURL: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, null, RootStateType>(
    mapStateToProps, {login}
)(Login)