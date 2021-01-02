import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userNoPhoto from "../../../assets/images/userNoPhoto.png";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div className={styles.ava}>
                    <img src={profile.photos.large!= null ? profile.photos.large : userNoPhoto} alt=''/>
                </div>
                <div>{profile.fullName}</div>

                <ProfileStatus status={status} updateStatus={updateStatus}/>

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
}
export default ProfileInfo;