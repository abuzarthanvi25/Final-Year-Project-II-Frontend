import * as Yup from 'yup'

export const loginInitialValues = {
  email: '',
  password: ''
}

export const signupInitialValues = {
  full_name: '',
  email: '',
  password: ''
}

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})

export const signupValidationSchema = Yup.object({
  full_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
})