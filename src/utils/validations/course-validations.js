import * as Yup from 'yup'

export const addCourseInitialValues = {
  title: '',
  description: '',
}

export const addCourseValidationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
})

export const addGroupCourseInitialValues = {
  title: '',
  description: '',
  members: [], // Initial value as an empty array
};

export const addGroupCourseValidationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  members: Yup.array()
    .of(Yup.string()) // Validation for an array of string ids
    .required('At least one member is required')
    .min(1, 'At least one member is required')
    .max(5, 'Maximum of 5 members allowed'),
});