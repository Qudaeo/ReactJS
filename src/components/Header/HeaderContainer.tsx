import {Component} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import { HeaderPropsType } from '../../types/types';

class HeaderContainer extends Component<HeaderPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({auth: state.auth})

export default connect(mapStateToProps, {logout})(HeaderContainer);