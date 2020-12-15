import React from "react";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {Redirect, withRouter} from "react-router";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.myCurrentAuthId

        if (userId > 0) this.props.getProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/login' />

        return (
            <Profile {...this.props}/>
        )
    }
}

let WithRouterInfoProfile = withRouter(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    myCurrentAuthId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {getProfile})(WithRouterInfoProfile)