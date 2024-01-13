import * as Yup from 'yup'

export const authInitialValues = {
  email: '',
  password: ''
}

export const authValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})