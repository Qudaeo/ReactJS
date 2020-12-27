import styles from "./FormControl.module.css"

const FormControl = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {props.children}
        </div>
        <div>
            {hasError && <span>{meta.error}</span>}
        </div>
    </div>
}

export const Textarea = (props) => {
    let {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...props.input} {...restProps} />
    </FormControl>
}

export const Input = (props) => {
    let {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <input {...props.input} {...restProps} />
    </FormControl>
}