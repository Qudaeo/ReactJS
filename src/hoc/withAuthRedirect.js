import {Redirect} from "react-router";
import {connect} from "react-redux";

const withAuthRedirect = (Component) => {
    let withRedirect = (props) => {
        if (!props.isAuth) return <Redirect to='/login'/>

        return <Component {...props}/>
    }

    let mapStateToProps = (state) => ({isAuth: state.auth.isAuth})

    return connect(mapStateToProps)(withRedirect)
}

export default withAuthRedirect