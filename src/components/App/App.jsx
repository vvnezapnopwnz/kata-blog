import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { alreadyAuthent, useAuthDispatch, useAuthState } from '../../context/authContext'
import blogService from '../../services/blogService'
import { CreateArticle } from '../Article/CreateArticle'
import { EditArticle } from '../Article/EditArticle'
import { SingleArticle } from '../Article/SingleArticle'
import { ArticlesList } from '../ArticlesList'
import { Header } from '../Header'
import { Profile } from '../User/Profile'
import { SignIn } from '../User/SignIn'
import { SignUp } from '../User/SignUp'
import classes from './App.module.scss'

const App = () => {
  const { getArticles, getArticle, createArticle, editArticle, deleteArticle, favoriteArticle } = new blogService()
  const { status, user: loggedUser } = useAuthState()
  const dispatch = useAuthDispatch()
  useEffect(() => {
    if (localStorage.getItem('token') && status === 'idle') {
      alreadyAuthent(dispatch)
    }
  }, [dispatch, status])

  return (
    <div className={classes.App}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={['/', '/articles']}>
            <ArticlesList getArticles={getArticles} favoriteArticle={favoriteArticle} />
          </Route>
          <Route exact path={'/articles/:slug'}>
            <SingleArticle getArticle={getArticle} deleteArticle={deleteArticle} favoriteArticle={favoriteArticle} />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          {loggedUser ? (
            <Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/new-article">
                <CreateArticle createArticle={createArticle} />
              </Route>
              <Route path={'/articles/:slug/edit'}>
                <EditArticle getArticle={getArticle} editArticle={editArticle} />
              </Route>
            </Route>
          ) : (
            <SignIn />
          )}
        </Switch>
      </Router>
    </div>
  )
}

export default App
