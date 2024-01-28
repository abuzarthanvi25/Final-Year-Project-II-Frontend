import * as Yup from 'yup'

export const AddChatInitialValues = {
    members: [],
    name: '', // New field for group name
}

export const AddChatValidationSchema = Yup.object({
    members: Yup.array()
        .of(Yup.string()) // Validation for an array of string ids
        .required('At least one member is required')
        .min(1, 'At least one member is required')
        .max(5, 'Maximum of 5 members allowed'),
    // name: Yup.string().required('Group Name is required')
})