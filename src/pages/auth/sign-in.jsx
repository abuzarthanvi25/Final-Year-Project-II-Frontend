import {
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit'
import { authInitialValues, authValidationSchema } from '@/utils/validations/auth-validations';
import { showFaliureToast, showSuccessToast } from '@/utils/toast-helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { registerUserRequest } from '@/store/reducers/auth-reducer';


export function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [iAgree, setIAgree] = useState(false);
  const [values, setValues] = useState({
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSignUp = (body) => {
    setLoading(true)

      dispatch(registerUserRequest({ body }))
        .then(unwrapResult)
        .then(res => {
          showSuccessToast(res?.data?.message)
          navigate('/dashboard/home')
          setLoading(false)
        })
        .catch(err => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })
  }


  const formik = useFormik({
    initialValues: authInitialValues,
    validationSchema: authValidationSchema,
    onSubmit: values => {
      // handleSignUp(values);
      showSuccessToast('res?.data?.message')
      console.log(values);
    }
  })

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        <div className="mb-1 flex flex-col">
          <TextField
            fullWidth
            id='email'
            label='Email'
            variant='outlined'
            size='small' // Added to make the field smaller
            sx={{ marginBottom: 4 }}
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
        />
            <FormControl fullWidth>
          <InputLabel
            size='small'
            error={formik.touched.password && Boolean(formik.errors.password)}
            htmlFor='auth-login-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            label='Password'
            id='auth-login-password'
            type={values.showPassword ? 'text' : 'password'}
            error={formik.touched.password && Boolean(formik.errors.password)}
            {...formik.getFieldProps('password')}
            size='small' // Added to make the field smaller
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  aria-label='toggle password visibility'
                >
                  {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
              {formik.errors.password}
            </Typography>
          )}
        </FormControl>
          </div>
          <Checkbox
            onChange={(e) => setIAgree(e.target.checked)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button disabled={loading || !iAgree} type='submit' className="mt-6" fullWidth>
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div style={{height: '90vh'}} className="w-2/5 hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
