import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import { updateProfile, useAuthDispatch, useAuthState } from '../../../context/authContext'
import classes from './Profile.module.scss'

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user: loggedUser } = useAuthState()
  const dispatch = useAuthDispatch()
  const [status, setStatus] = useState('idle')
  if (status === 'success') return <Redirect to="/" />

  const onSubmit = async (userData) => {
    if (loggedUser.token) {
      const { token } = loggedUser
      updateProfile(dispatch, { ...userData, token }).then(() => setStatus('success'))
    }
  }
  return (
    <section className={classes.Profile}>
      <form onSubmit={(e) => e.preventDefault()} className={classes.Profile_Form}>
        <h2 className={classes.Form_Title}>Update profile</h2>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="name">
            Username
          </label>
          <input
            className={classes.Input}
            placeholder="Username"
            name="username"
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="email">
            Email address
          </label>
          <input
            className={classes.Input}
            name="email"
            {...register('email', {
              required: 'email должен быть корректным почтовым адресом',
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            placeholder="Email address"
          />
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="password">
            New password
          </label>
          <input
            className={classes.Input}
            {...register('password', {
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Password must have less or equivalent to 40 characters',
              },
            })}
            name="password"
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="image">
            Avatar image
          </label>
          <input className={classes.Input} name="image" {...register('image', {})} placeholder="Avatar image" />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
        <hr />
        <button className={classes.Submit} type="submit" onClick={handleSubmit(onSubmit)}>
          Update
        </button>
      </form>
    </section>
  )
}

export default Profile
