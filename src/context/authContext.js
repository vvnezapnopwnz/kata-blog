import { createBrowserHistory } from 'history'
import PropTypes from 'prop-types'
import React from 'react'

import blogService from '../services/blogService'

const history = createBrowserHistory()

const service = new blogService()

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

function reducer(currentState, newState) {
  return { ...currentState, ...newState }
}

function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (!context) throw new Error('useAuthState must be used in AuthProvider')

  return context
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (!context) throw new Error('useAuthDispatch must be used in AuthProvider')

  return context
}

const initialState = {
  status: 'idle',
  user: null,
  error: null,
}

function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{props.children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
}
async function alreadyAuthent(dispatch) {
  try {
    dispatch({ status: 'pending' })
    const getUser = await service.getUser({ token: localStorage.getItem('token') })

    dispatch({
      status: 'resolved',
      user: getUser.user,
      error: null,
    })
  } catch (error) {
    dispatch(initialState)
  }
}

async function updateProfile(dispatch, user) {
  try {
    dispatch({ status: 'pending' })
    const result = await service.updateUser(user)
    localStorage.setItem('token', result.user.token)
    const userData = { ...result.user, token: localStorage.getItem('token') }
    const getUser = await service.getUser(userData)
    dispatch({
      status: 'resolved',
      user: getUser.user,
      error: null,
    })
  } catch (error) {
    dispatch({ status: 'rejected', error })
  }
}

async function doRegister(dispatch, user) {
  try {
    dispatch({ status: 'pending' })
    const result = await service.registerUser(user)
    const getUser = await service.getUser(result.user)
    dispatch({
      status: 'resolved',
      user: getUser.user,
      error: null,
    })
  } catch (error) {
    dispatch({ status: 'rejected', error })
  }
}

async function doLogin(dispatch, user) {
  try {
    dispatch({ status: 'pending' })
    const result = await service.loginUser(user)
    localStorage.setItem('token', result.user.token)
    const userData = { ...result.user, token: localStorage.getItem('token') }
    const getUser = await service.getUser(userData)
    dispatch({
      status: 'resolved',
      user: getUser.user,
      error: null,
    })
  } catch (error) {
    dispatch({ status: 'rejected', error })
  }
}

function doLogout(dispatch) {
  dispatch(initialState)
  localStorage.removeItem('token')
  history.push('/')
}

export { AuthProvider, useAuthState, useAuthDispatch, doLogin, doLogout, doRegister, updateProfile, alreadyAuthent }
