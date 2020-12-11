import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router";

class ProfileContainer extends React.Component {

    componentDidMount() {
        debugger
//        this.props.toggleIsFetching(true)
        let userId = this.props.match.params.userId
        if (!userId) userId = 2
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)

            .then(response => {

//                this.props.toggleIsFetching(false)
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}


let WithRouterInfoProfile = withRouter(ProfileContainer)


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(WithRouterInfoProfile)