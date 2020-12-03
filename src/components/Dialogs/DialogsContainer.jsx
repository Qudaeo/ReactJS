import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

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

let mapStateToProps = (state) => {
    return {
        users: state.dialogsPage.users,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        updateMessageText: (text) => {
            dispatch(updateMessageTextActionCreator(text))
        }
    }
}

const DialogsContainer =connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer