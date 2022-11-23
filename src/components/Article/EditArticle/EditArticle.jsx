import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'

import { useAuthState } from '../../../context/authContext'
import ArticleForm from '../ArticleForm/ArticleForm'

function EditArticle({ editArticle, getArticle }) {
  const [status, setStatus] = useState('idle')
  const [articleData, setArticleData] = useState({})
  let match = useRouteMatch()
  useEffect(() => {
    getArticle(`articles/${match.params.slug}`).then(({ article }) => {
      setArticleData(article)
    })
  }, [getArticle, match.params.slug, status])

  const { user: loggedUser } = useAuthState()
  if (status === 'success') return <Redirect to={`/articles/${match.params.slug}`} />

  const onSubmit = async (formData) => {
    const tagList = formData.tags ? Object.values(formData.tags) : []
    if (loggedUser) {
      await editArticle({ ...formData, tags: tagList }, match.params.slug)
        .then(() => {
          setStatus('success')
        })
        .catch(() => {
          setStatus('error')
        })
    }
  }

  return <ArticleForm articleData={articleData} onSubmit={onSubmit} />
}

EditArticle.defaultProps = {
  getArticle: () => {},
  editArticle: () => {},
}

EditArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
}

export default EditArticle
