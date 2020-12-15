import React from "react";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import withAuthRedirect from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.myCurrentAuthId

        if (userId > 0) this.props.getProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let WithRouterInfoProfile = withRouter(ProfileContainer)
let WithAuthRedirect = withAuthRedirect(WithRouterInfoProfile)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    myCurrentAuthId: state.auth.id
})

export default connect(mapStateToProps, {getProfile})(WithAuthRedirect)