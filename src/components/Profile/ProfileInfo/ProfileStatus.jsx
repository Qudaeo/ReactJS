import { useState, useEffect } from "react";
import styles from './ProfileStatus.module.css'

const ProfileStatus = props => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState('')

    useEffect(() => setStatus(props.status), [props.status])

    const enableEditMode = () => {
        setEditMode(true)
//        setStatus(props.status)
    }

    const disableEditMode = (e) => {
        setEditMode(false)
        props.updateStatus(e.currentTarget.value)
    }

    return <>
        {(editMode)
            ? <input
                onBlur={disableEditMode}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                autoFocus={true}
            />
            : <span className={styles.status} onClick={enableEditMode}>{props.status || 'Enter your new status'} </span>
        }
    </>
}

export default ProfileStatus