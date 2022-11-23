import React from 'react'
import { Link } from 'react-router-dom'

import { doLogout, useAuthDispatch, useAuthState } from '../../context/authContext'
import classes from './Header.module.scss'

const Header = () => {
  const { user: loggedUser } = useAuthState()
  const dispatch = useAuthDispatch()
  const logOut = () => doLogout(dispatch)

  return (
    <header className={classes.Header}>
      <Link to="/" className={classes.Header_Title}>
        RealWorld Blog
      </Link>
      {loggedUser ? (
        <>
          <button className={classes.Create_Article_Button} onClick={() => {}}>
            <Link to="/new-article"> Create article</Link>
          </button>
          <Link to="/profile">
            <div className={classes.User}>
              <div className={classes.User_Name}>{loggedUser.username}</div>
              <img className={classes.User_Avatar} src={loggedUser.image} alt={`${loggedUser.username}`} />
            </div>
          </Link>
          <button className={classes.Logout_Button} onClick={() => logOut()}>
            LogOut
          </button>
        </>
      ) : (
        <>
          <button className={classes.Signin_Button} onClick={() => {}}>
            <Link to="/sign-in">Sing In</Link>
          </button>
          <button className={classes.Signup_Button} onClick={() => {}}>
            <Link to="/sign-up">Sing Up</Link>
          </button>
        </>
      )}
    </header>
  )
}

export default Header
