import {connect} from "react-redux";
import Login from "./Login";
import {login} from "../../redux/authReducer";

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {login})(Login)