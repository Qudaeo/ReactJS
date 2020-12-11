import React from 'react'
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";

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
    auth: state.auth
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);