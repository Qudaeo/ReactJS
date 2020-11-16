import React from 'react'
import s from './ProfileInfo.module.css'
import topImg from './topImage.png'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img alt="" className={s.topImage} src={topImg}/>
            </div>
            <div className={s.description}>
                ava + description
            </div>
        </div>
    )
}
export default ProfileInfo;