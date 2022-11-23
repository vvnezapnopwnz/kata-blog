import { format } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'

import { useAuthState } from '../../../context/authContext'
import classes from './SingleArticle.module.scss'

const SingleArticle = ({ getArticle, deleteArticle, favoriteArticle }) => {
  let match = useRouteMatch()

  let likeButton = useRef()
  const [articleData, setArticleData] = useState({})
  const [deleteActive, setDelete] = useState(false)
  const [ifDeleted, setIfDeleted] = useState(false)

  const { user: loggedUser } = useAuthState()
  useEffect(() => {
    getArticle(match.url).then(({ article }) => {
      setArticleData(article)
    })
  }, [getArticle, match.url])
  const sendToFavorites = (favorited) => {
    if (favorited) {
      favoriteArticle(match.params.slug, false).then((article) => {
        setArticleData(article)
      })
    } else {
      favoriteArticle(match.params.slug, true).then((article) => {
        setArticleData(article)
      })
    }
  }

  if (ifDeleted) return <Redirect to="/" />
  const { title, favoritesCount, author, createdAt, tagList, description, body, favorited, slug } = articleData
  const onDelete = () => {

    setDelete(!deleteActive)
  }

  const deleteConfirmed = (slug) => {
    deleteArticle(slug)
      .then(() => {
        setIfDeleted(true)
      })
  }

  const deleteConfirm = (
    <div className={classes.Delete_Confirm}>
      <div className={classes.Delete_Warning}>
        <i className={classes.Icon_Warning} />
        <span>Are you sure to delete this article?</span>
      </div>
      <div className={classes.Delete_Buttons}>
        <button onClick={() => onDelete()}>No</button>
        <button onClick={() => deleteConfirmed(slug)}>Yes</button>
      </div>
    </div>
  )

  const likeIconClicked =
    favorited === true ? [classes.Likes_Button, classes.Liked].join(' ') : classes.Likes_Button
  return (
    <div className={classes.Single_Article}>
      <header className={classes.Single_Article_Header}>
        <h5 className={classes.Title}>{title}</h5>
        <div className={classes.Likes_Content}>
          <button ref={likeButton} className={likeIconClicked} onClick={() => sendToFavorites(favorited)}></button>
          <span className={classes.Likes_Count}>{favoritesCount}</span>
        </div>
        <div className={classes.Author}>
          {author && (
            <div className={classes.User}>
              <div className={classes.User_Name}>{author.username}</div>
              {createdAt && <div className={classes.User_Created}>{format(new Date(createdAt), 'PPP')}</div>}
              <img className={classes.User_Avatar} src={author.image} alt={`${author.username}`} />
            </div>
          )}
        </div>
      </header>
      <ul className={classes.Tag_List}>
        {tagList &&
          tagList.map((tag, index) => (
            <li key={index} className={classes.Tag}>
              {tag}
            </li>
          ))}
      </ul>
      <div className={classes.Article_Detail}>
        <p className={classes.Description}>{description}</p>
        {loggedUser && (
          <>
            <button className={classes.Delete_Button} onClick={onDelete}>
              Delete
            </button>
            {deleteActive ? deleteConfirm : null}
            <button className={classes.Edit_Button}>
              <Link to={`${slug}/edit`}> Edit</Link>
            </button>
          </>
        )}
      </div>
      <section className={classes.Markdown}>
        <Markdown>{body}</Markdown>
      </section>
    </div>
  )
}
SingleArticle.defaultProps = {
  deleteArticle: () => {},
  getArticle: () => {},
  favoriteArticle: () => {},
}

SingleArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
}
export default SingleArticle
