import s from './ProfileInfo.module.css'
import topImg from './topImage.png'
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

    debugger

    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div>
                    <img alt="" className={s.topImage} src={topImg}/>
                </div>
                <div className={s.description}>
                    <img src={props.profile.photos.large} alt=''/>
                </div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.fullName}</div>
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