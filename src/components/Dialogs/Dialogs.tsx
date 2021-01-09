import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators";
import {Textarea} from "../common/FormControls/FormControl";
import {MessageType, UserType} from "../../types/types";

const maxLength30 = maxLength(30)

type DialogsFormPropsType = {
    handleSubmit: any
}

const DialogsForm = ({handleSubmit}: DialogsFormPropsType) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} name='message' placeholder='Enter your message'
                       validate={[required, maxLength30]}
                />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}
const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm)

type DialogsPropsType = {
    users: Array<UserType>
    messages: Array<MessageType>
    addMessage: any
}

const Dialogs = ({users, messages, addMessage}: DialogsPropsType) => {
    const userElements = users.map(u => <DialogItem
        key={u.id}
        userId={u.id}
        userName={u.name}/>)

    const messageElements = messages.map(m => <MessageItem
        key={m.id}
        message={m.message}
        isMyMessage={m.isMyMessage}/>)

    return (
        <div>
            <div className={styles.Dialogs}>
                <div>
                    {userElements}
                </div>
                <div className={styles.messages}>
                    {messageElements}
                </div>
            </div>
            <div className={styles.addMessage}>
                <DialogsReduxForm onSubmit={(values: any) => {
                    addMessage(values.message)
                }}/>
            </div>
        </div>
    )
}

export default Dialogs