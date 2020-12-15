import {addMessage, updateMessageText} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        users: state.dialogsPage.users,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

let WithAuthRedirect = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, {addMessage, updateMessageText})(WithAuthRedirect)

export default DialogsContainer