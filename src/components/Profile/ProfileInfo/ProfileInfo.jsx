import {useState} from "react";
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userNoPhoto from "../../../assets/images/userNoPhoto.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (
    {profile, status, updateStatus, isOwner, saveAvatarPhoto, saveProfileData}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile)
        return <Preloader/>

    const onChangeAvatarPhoto = (e) => {
        if (e.target.files && (e.target.files.length > 0))
            saveAvatarPhoto(e.target.files[0])
    }

    const saveProfile = async (formData) => {
        await saveProfileData({...profile, ...formData})
        setEditMode(false)
    }

    return (
        <div className={styles.ProfileBlock}>
            <div className={styles.avaBlock}>
                <div className={styles.buttonOnImage}>
                    {
                        (isOwner) &&
                        <label className="uploadFile">
                            <input type='file' onChange={(e) => onChangeAvatarPhoto(e)}/>
                            Upload new photo
                        </label>
                    }
                </div>
                <img src={profile.photos.large || userNoPhoto} alt='' className={styles.avaPhoto}/>
            </div>

            <div><b>Full name:</b> {profile.fullName}</div>
            <div className={styles.statusBlock}><b>Status: </b>
                {(isOwner)
                    ? <ProfileStatus status={status} updateStatus={updateStatus}/>
                    : <span>{status}</span>
                }
            </div>

            <hr/>

            {(editMode)
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={saveProfile}/>
                : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={() => setEditMode(true)}/>
            }
            <hr/>

        </div>
    )
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return <>
        {(isOwner) && <button onClick={activateEditMode}>Edit</button>}

        <div><b>About me:</b> {profile.aboutMe}</div>

        <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>

        {profile.lookingForAJob &&
        <div><b>Skills:</b> {profile.lookingForAJobDescription}</div>
        }

        <div className={styles.contacts}><b>Contacts:</b></div>

        {Object.keys(profile.contacts).map(key =>
            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        )}
    </>
}

const Contact = ({contactTitle, contactValue}) => {
    return (contactValue) &&
        <div className={styles.contact}><b>{contactTitle}: </b>{contactValue}</div>
}

export default ProfileInfo;