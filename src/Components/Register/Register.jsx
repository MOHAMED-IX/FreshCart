import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {


  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues: {
      'name': '',
      'email': '',
      'password': '',
      'rePassword': '',
      'phone': ''
    },
    onSubmit: register,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
      email: Yup.string().required('Email is required').email('Invalid email address'),
      password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must be at least 8 characters, contain at least one letter, one number and one special character'),
      rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone: Yup.string().required('phone is required')
    })
  })

  // function validateData() {
  //   let errors = {}

  //   if (!values.name) {
  //     errors.name = 'Name is required'
  //   } else if (values.name.length < 3) {
  //     errors.name = 'Name must be at least 3 characters'
  //   } else if (values.name.length > 20) {
  //     errors.name = 'Name must be less than 20 characters'
  //   }

  //   if (!values.email) {
  //     errors.email = 'email is required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address'
  //   }

  //   if (!values.password) {
  //     errors.password = 'password is required'
  //   } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password) != true) {
  //     errors.password = 'Password must be at least 8 characters, contain at least one letter, one number and one special character'
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'rePassword is required'
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = 're-Password must be same as password'
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'phone is required'
  //   }

  //   console.log(errors);
  //   return errors
  // }

  async function register() {

    setSuccessMessage('')
    setErrorMessage('')
    setIsLoading(true)

    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
      setIsLoading(false)
      console.log(data);
      setSuccessMessage(data.message)
      setTimeout(() => {
        navigate('/login')
      }, 500)
    }).catch((err) => {
      setIsLoading(false)
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
    })
  }

  return <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className='min-h-screen flex items-center justify-center'>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Register {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
          {errorMessage && <p className='text-red-500 text-center font-semibold'>{errorMessage}</p>}
          {successMessage && <p className='text-green-500 text-center font-semibold'>{successMessage}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400 dark:text-gray-300">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
      </div>
    </div>

  </>
}
