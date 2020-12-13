import React from 'react'
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";
import {setUserProfile} from "../../redux/profileReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {

        axios
            .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
                withCredentials: true
            })
            .then(
                request => {
                    if (request.data.resultCode === 0) {
                        let {id, email, login} = request.data.data
                        this.props.setAuthUserData(id, email, login)

                        axios
                            .get(`https://social-network.samuraijs.com/api/1.0/profile/` + id)

                            .then(response => {
                                this.props.setUserProfile(response.data)
                            })

                    } else {
                        alert('Error')
                    }


                }
            )
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData, setUserProfile})(HeaderContainer);