import { List } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import classes from './ArticlesList.module.scss'

const ArticlesList = ({ getArticles, favoriteArticle }) => {
  const sendToFavorites = (slug, favorited) => {
    if (favorited) {
      favoriteArticle(slug, false).then(() => {
        getArticles().then(({ articles, articlesCount }) => {
          setArticlesData({ articles, articlesCount })
        })
      })
    } else {
      favoriteArticle(slug, true).then(() => {
        getArticles().then(({ articles, articlesCount }) => {
          setArticlesData({ articles, articlesCount })
        })
      })
    }
  }
  const [articlesData, setArticlesData] = useState({})
  let likeButton = useRef()
  useEffect(() => {
    getArticles().then(({ articles, articlesCount }) => {
      setArticlesData({ articles, articlesCount })
    })
  }, [getArticles])
  const likeIconClicked = (favorited) =>
    favorited === true ? [classes.Likes_Button, classes.Liked].join(' ') : classes.Likes_Button
  return (
    <div className={classes.Articles}>
      <List
        className={classes.Articles_List}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            getArticles(page * 5).then(({ articles, articlesCount }) => {
              setArticlesData({ articles, articlesCount })
            })
          },
          pageSize: 5,
          total: articlesData.articlesCount,
          showSizeChanger: false,
          showTotal: false,
          showQuickJumper: false,
          showLessItems: true,
          className: classes['ant-pagination'],
        }}
        dataSource={articlesData.articles}
        renderItem={(item, index) => (
          <List.Item key={index} className={classes.Articles_List_Item}>
            <List.Item.Meta />
            <div className={classes.Article}>
              <header>
                <Link className={classes.Article_Title} to={`articles/${item.slug}`}>
                  {item.title}
                </Link>
                <div className={classes.Likes_Content}>
                  <button
                    ref={likeButton}
                    className={likeIconClicked(item.favorited)}
                    onClick={() => sendToFavorites(item.slug, item.favorited)}
                  ></button>
                  <span className={classes.Likes_Count}>{item.favoritesCount}</span>
                </div>
              </header>
              <ul className={classes.Tag_List}>
                {item.tagList &&
                  item.tagList.map((tag, index) => (
                    <li key={index} className={classes.Tag}>
                      {tag}
                    </li>
                  ))}
              </ul>
              <div className={classes.Description}>{item.description}</div>
              <div>
                <div className={classes.Author}>
                  {item.author && (
                    <div className={classes.User}>
                      <div className={classes.User_Name}>{item.author.username}</div>
                      {item.createdAt && (
                        <div className={classes.User_Created}>{format(new Date(item.createdAt), 'PPP')}</div>
                      )}
                      <img
                        className={classes.User_Avatar}
                        src={item.author.image}
                        alt={`${item.author.username}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

ArticlesList.defaultProps = {
  getArticles: () => {},
  favoriteArticle: () => {},
}

ArticlesList.propTypes = {
  getArticles: PropTypes.func.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
}

export default ArticlesList
