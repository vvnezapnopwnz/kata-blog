import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'

import { doLogin, useAuthDispatch, useAuthState } from '../../../context/authContext'
import classes from './SignIn.module.scss'

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { user: loggedUser } = useAuthState()
  const dispatch = useAuthDispatch()
  if (loggedUser) return <Redirect to="/" />

  const onSubmit = (userData) => {
    doLogin(dispatch, userData)
  }

  return (
    <section className={classes.Sign_In}>
      <form onSubmit={(e) => e.preventDefault()} className={classes.Sign_in_Form}>
        <h2 className={classes.Form_Title}>Sign In</h2>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="email">
            Email address
          </label>
          <input
            className={classes.Input}
            name="email"
            {...register('email', {
              required: 'email cannot be blank',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'email должен быть корректным почтовым адресом',
              },
            })}
            placeholder="Email address"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="password">
            Password
          </label>
          <input
            className={classes.Input}
            {...register('password', {
              required: 'password cannot be blank',
            })}
            name="password"
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <hr />
        <button className={classes.Submit} type="submit" onClick={handleSubmit(onSubmit)}>
          Login
        </button>
        <p>
          Don’t have an account?
          <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </section>
  )
}

export default SignIn
