import {useState, FC, ChangeEvent} from "react";
import styles from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

const ProfileStatus: FC<PropsType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false)
    const [inputStatus, setInputStatus] = useState('')

    const enableEditMode = () => {
        setEditMode(true)
        setInputStatus(status)
    }

    const disableEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        updateStatus(e.target.value)
    }

    return <>
        {(editMode)
            ? <input
                onBlur={disableEditMode}
                value={inputStatus}
                onChange={(e) => setInputStatus(e.target.value)}
                autoFocus={true}
            />
            : <span className={styles.status} onClick={enableEditMode}>{status || 'Enter your new status'} </span>
        }
    </>
}

export default ProfileStatus