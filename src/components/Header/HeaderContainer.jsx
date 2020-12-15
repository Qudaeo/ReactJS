import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthMe} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthMe()
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({auth: state.auth})

export default connect(mapStateToProps, {getAuthMe})(HeaderContainer);