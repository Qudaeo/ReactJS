import React from "react";
import {Input, Textarea} from "../../common/FormControls/FormControl";
import {required} from "../../../utils/validators";
import {Field, reduxForm} from "redux-form";
import styles from "./ProfileInfo.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return <form onSubmit={handleSubmit}>
        <div><b>About me:</b> <Field component={Input} validate={[required]} name='aboutMe'
                                     placeholder='About me'/></div>

        <div><b>Looking for a job:</b> <Field component={Input} name='lookingForAJob'
                                              type='checkbox'/></div>

        <div><b>Skills:</b> <Field component={Textarea} name='lookingForAJobDescription'
                                   placeholder='Skills'/></div>

        <div className={styles.contacts}><b>Contacts:</b></div>
        {Object.keys(profile.contacts).map(key =>
            <ContactForm key={key} contactTitle={key}/>
        )}

        {error && <div className={styles.divError}>
            {error}
        </div>}

        <button>Save</button>
    </form>
}

const ContactForm = ({contactTitle}) => {
    return <div className={styles.contact}>
        <b>{contactTitle}</b><Field component={Input} name={'contacts.' + contactTitle}/>
    </div>
}

export default reduxForm({form: 'editProfile'})(ProfileDataForm)