import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

let  Profile = (props) => {
    return (
        <div>
            <ProfileInfo {...props}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;