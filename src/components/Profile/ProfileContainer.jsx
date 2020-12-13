import React from "react";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {userAPI} from "../../api/api";

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.myCurrentAuthId

        if (userId > 0) {

            userAPI.getProfile(userId)
                .then(data => this.props.setUserProfile(data))
        }

    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let WithRouterInfoProfile = withRouter(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    myCurrentAuthId: state.auth.id
})

export default connect(mapStateToProps, {setUserProfile})(WithRouterInfoProfile)