import React from 'react'
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img alt="" className={s.topImage}
                     src={'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png'}/>
            </div>
            <div className={s.description}>
                ava + desciption
            </div>
        </div>
    )
}
export default ProfileInfo;