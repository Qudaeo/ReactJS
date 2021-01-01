export const required = value => {
    if (!value)
        return 'Field is required'
}

export const maxLength = maxLength => value => {
    if (value.length > maxLength)
        return 'Field length must < ' + maxLength
}