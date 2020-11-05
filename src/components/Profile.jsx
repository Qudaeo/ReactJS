import s from './Profile.module.css'

const Profile = () => {
    return(
        <div className={s.content}>
            <div>
                <img src={'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png'}/>
            </div>
            <div>
                ava + desciption
            </div>
            <div>
                my posts
                <div>
                    new post
                    <div>
                        post1
                    </div>
                    <div>
                        post2
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Profile;