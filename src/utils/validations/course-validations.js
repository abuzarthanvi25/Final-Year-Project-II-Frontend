import * as Yup from 'yup'

export const addCourseInitialValues = {
  title: '',
  description: '',
}

export const addCourseValidationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
})