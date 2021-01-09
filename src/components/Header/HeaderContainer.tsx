import { Component } from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {AuthType} from "../../types/types";

type HeaderContainerPropsType = {
    auth: AuthType
    logout:any
}

class HeaderContainer extends Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({auth: state.auth})

export default connect(mapStateToProps, {logout})(HeaderContainer);