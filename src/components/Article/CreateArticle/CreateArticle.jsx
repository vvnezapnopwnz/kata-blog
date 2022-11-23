import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {useAuthState } from '../../../context/authContext'
import ArticleForm from '../ArticleForm/ArticleForm'

function CreateArticle({ createArticle }) {
  const [status, setStatus] = useState('idle')
  const { user: loggedUser } = useAuthState()
  if (status === 'success') return <Redirect to="/" />

  const onSubmit = async (formData) => {
    const tagList = formData.tags ? Object.values(formData.tags) : []
    if (loggedUser) {
      await createArticle({ ...formData, tags: tagList }).then(() => {
        setStatus('success')
      })
    }
  }

  return <ArticleForm onSubmit={onSubmit} />
}
CreateArticle.defaultProps = {
  createArticle: () => {},
}

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
}

export default CreateArticle
