import React from "react";
import {Input, Textarea} from "../../common/FormControls/FormControl";
import {required} from "../../../utils/validators";
import {Field, reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit}) => {

    return <form onSubmit={handleSubmit}>
        <div><b>About me:</b> <Field component={Input} validate={[required]} name='aboutMe'
                                     placeholder='About me'/></div>

        <div><b>Looking for a job:</b> <Field component={Input} name='lookingForAJob'
                                              type='checkbox'/></div>

        <div><b>Skills:</b> <Field component={Textarea} name='lookingForAJobDescription'
                                   placeholder='Skills'/></div>

        <button>Save</button>

        {/*        <div className={styles.contacts}>Contacts:</div>
        {Object.keys(profile.contacts).map(key =>
            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        )}*/}
    </form>
}

export default reduxForm({form: 'editProfile'})(ProfileDataForm)