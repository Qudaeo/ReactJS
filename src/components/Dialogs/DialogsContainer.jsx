import {addMessage, updateMessageText} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        users: state.dialogsPage.users,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

const DialogsContainer = connect(mapStateToProps, {addMessage, updateMessageText})(Dialogs)

export default DialogsContainer

/*
const DialogsContainer = () => {
    return <StoreContext>
        {(store) => {
            let state = store.getState().dialogsPage;

            let addMessage = () => {
                store.dispatch(addMessageActionCreator())
            }

            let updateMessageText = (text) => {
                store.dispatch(updateMessageTextActionCreator(text))
            }

            return <Dialogs
                users={state.users}
                messages={state.messages}
                newMessageText={state.newMessageText}
                addMessage={addMessage}
                updateMessageText={updateMessageText}/>
        }
        }
    </StoreContext>
}
 */