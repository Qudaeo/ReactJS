import styles from "./FormControl.module.css"
import React from "react";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        <div>
            {hasError && <span>{error}</span>}
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