import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userNoPhoto from "../../../assets/images/userNoPhoto.png";

const ProfileInfo = ({profile, status, updateStatus, isOwner, saveAvatarPhoto}) => {


    if (!profile)
        return <Preloader/>

    const onChangeAvatarPhoto =(e) => {
        if(e.target.files.length> 0) saveAvatarPhoto(e.target.files[0])
    }

    return (
        <div className={styles.ProfileBlock}>
            <div>
                <img src={profile.photos.large || userNoPhoto} alt='' className={styles.avaPhoto}/>
            </div>
            {
                (isOwner) &&
                <input type='file' onChange={(e) => onChangeAvatarPhoto(e)}/>
            }
            <div>{profile.fullName}</div>

            {(isOwner)
                ? <ProfileStatus status={status} updateStatus={updateStatus}/>
                : <span>{status}</span>
            }

            <div>{profile.aboutMe}</div>

            <div>{profile.lookingForAJobDescription}</div>
            <div>{profile.contacts.facebook}</div>
            <div>{profile.contacts.github}</div>
            <div>{profile.contacts.instagram}</div>
            <div>{profile.contacts.twitter}</div>
            <div>{profile.contacts.vk}</div>
            <div>{profile.contacts.website}</div>
            <div>{profile.contacts.youtube}</div>
        </div>
    )
}

export default ProfileInfo;