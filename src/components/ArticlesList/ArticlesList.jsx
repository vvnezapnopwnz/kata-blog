import { Pagination, List } from "antd";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import classes from "./ArticlesList.module.scss";
import blogService from "../../services/blogService";
const ArticlesList = () => {
  // let match = useRouteMatch();
  // console.log(match)
  const [articlesData, setArticlesData] = useState({});

  useEffect(() => {
    blogService.getArticles().then(({ articles, articlesCount }) => {
      console.log(articles);
      setArticlesData({ articles, articlesCount });
    });
  }, []);

  return (
    <div className={classes["articles"]}>
      <List
        className={classes["articles__list"]}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
            blogService
              .getArticles(page * 5)
              .then(({ articles, articlesCount }) => {
                setArticlesData({ articles, articlesCount });
              });
          },
          pageSize: 5,
          total: articlesData.articlesCount,
          showSizeChanger: false,
          showTotal: false,
          showQuickJumper: false,
          showLessItems: true,
          className: classes['ant-pagination']
        }}
        dataSource={articlesData.articles}
        renderItem={(item, i) => (
          <List.Item key={item.i} className={classes["articles__list-item"]}>
            <List.Item.Meta />
            <div className={classes["article"]}>
              <header>
                <Link
                  className={classes["article__title"]}
                  to={`articles/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className={classes["likes__content"]}>
                  <button
                    ref={item.likeButton}
                    className={classes["likes__button"]}
                    // onClick={() => favorite()}
                  ></button>
                  <span className={classes["likes__count"]}>
                    {item.favoritesCount}
                  </span>
                </div>
              </header>
              <ul className={classes["tag__list"]}>
                {item.tagList &&
                  item.tagList.map((tag, index) => (
                    <li key={index} className={classes["tag"]}>
                      {tag}
                    </li>
                  ))}
              </ul>
              <div className={classes["description"]}>{item.description}</div>
              <div>
                <div className={classes["author"]}>
                  {item.author && (
                    <div className={classes.user}>
                      <div className={classes["user__name"]}>
                        {item.author.username}
                      </div>
                      {item.createdAt && (
                        <div className={classes["user__created"]}>
                          {format(new Date(item.createdAt), "PPP")}
                        </div>
                      )}
                      <img
                        className={classes["user__avatar"]}
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
  );
};

export default ArticlesList;
