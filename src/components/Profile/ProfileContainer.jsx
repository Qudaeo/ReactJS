import React from "react";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.myCurrentAuthId

        if (userId > 0) {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    myCurrentAuthId: state.auth.id,
    status: state.profilePage.status
})

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus})
)(ProfileContainer)