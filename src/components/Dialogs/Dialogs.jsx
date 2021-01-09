import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators";
import {Textarea} from "../common/FormControls/FormControl";

const maxLength30 = maxLength(30)

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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

const Dialogs = (props) => {
    let userElements = props.users.map(u => <DialogItem
        key={u.id}
        userId={u.id}
        userName={u.name}/>)

    let messageElements = props.messages.map(m => <MessageItem
        key={m.id}
        message={m.message}
        isMyMessage={m.isMyMessage}/>)

    let addMessage = (values) => {
        props.addMessage(values.message)
    }

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
                <DialogsReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}

export default Dialogs