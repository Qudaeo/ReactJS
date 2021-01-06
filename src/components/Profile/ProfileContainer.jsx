import React from "react";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus, saveAvatarPhoto, saveProfileData} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.myCurrentAuthId

        if (userId > 0) {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile /*{...this.props}*/
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                saveAvatarPhoto={this.props.saveAvatarPhoto}
                saveProfileData={this.props.saveProfileData}
                isOwner={(!this.props.match.params.userId)}
            />
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
    connect(mapStateToProps,
        {getProfile, getStatus, updateStatus, saveAvatarPhoto, saveProfileData})
)(ProfileContainer)