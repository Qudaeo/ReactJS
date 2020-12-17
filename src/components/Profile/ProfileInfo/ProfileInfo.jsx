import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
             <div>
                <div className={styles.ava}>
                    <img src={props.profile.photos.large} alt=''/>
                </div>
                <div>{props.profile.fullName}</div>
                <ProfileStatus status={props.status}
                               updateStatus={props.updateStatus}/>

                <div>{props.profile.aboutMe}</div>

                <div>{props.profile.lookingForAJobDescription}</div>
                <div>{props.profile.contacts.facebook}</div>
                <div>{props.profile.contacts.github}</div>
                <div>{props.profile.contacts.instagram}</div>
                <div>{props.profile.contacts.twitter}</div>
                <div>{props.profile.contacts.vk}</div>
                <div>{props.profile.contacts.website}</div>
                <div>{props.profile.contacts.youtube}</div>
            </div>
        )
    }
}
export default ProfileInfo;