import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {RootStateType} from "../../redux/store";
import {MessageType, UserType} from "../../types/types";

type MapStateToPropsType = {
    users: Array<UserType>
    messages: Array<MessageType>
    newMessageText: string
}

type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        users: state.dialogsPage.users,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

const DialogsContainer = compose(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, null, RootStateType>
    (mapStateToProps, {addMessage})
)(Dialogs)

export default DialogsContainer