import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return(
        <div>
            <div>
                <img className={s.topImage} src={'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png'}/>
            </div>
            <div>
                ava + desciption
            </div>

            <MyPosts />

        </div>
    )
}
export default Profile;