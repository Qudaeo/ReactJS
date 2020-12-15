import {connect} from "react-redux";
import Login from "./Login";

let mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})

export default connect(mapStateToProps)(Login)