import React from "react";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {


/*    let state = props.store.getState().dialogsPage;

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    let updateMessageText = (text) => {
        props.store.dispatch(updateMessageTextActionCreator(text))
    }*/

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


export default DialogsContainer