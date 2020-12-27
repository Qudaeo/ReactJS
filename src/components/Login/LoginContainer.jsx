import {connect} from "react-redux";
import Login from "./Login";
import {login} from "../../redux/authReducer";

let mapStateToProps = state => ({isAuth: state.auth.isAuth})

export default connect(mapStateToProps, {login})(Login)