import React, {FC} from "react";
import styles from "./FormControl.module.css"
import {WrappedFieldProps} from "redux-form";

const FormControl: FC<WrappedFieldProps> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        <div>
            {hasError && <span>{error} </span>}
        </div>
    </div>
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
            <textarea {...props.input}
                      {...
                          restProps
                      }
            />
    </FormControl>
}

export const Input:FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <input {...props.input}
               {...
                   restProps
               }
        />
    </FormControl>
}