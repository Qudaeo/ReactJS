import s from './Dialogs.module.css'

const Dialogs = (props) => {
    return(
        <div className={s.Dialogs}>
            <div className={s.dialogItems}>
                <div className={s.dialog + ' ' + s.active}>Dimych</div>
                <div className={s.dialog}>Pavel</div>
                <div className={s.dialog}>Yana</div>
            </div>
            <div className={s.messages}>
                <div className={s.massage}>hey</div>
                <div className={s.massage}>yo</div>
            </div>
        </div>
    )
}

export default Dialogs