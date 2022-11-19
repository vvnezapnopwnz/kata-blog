import Markdown from "react-markdown";
import { useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import React, { useState, useEffect, useRef } from "react";
import classes from "./SingleArticle.module.scss";
// import blogService from "../../services/blogService";
const SingleArticle = ({ getArticle }) => {
  let match = useRouteMatch();
  //   console.log(match)
  let likeButton = useRef();
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    getArticle(match.url).then(({ article }) => {
      setArticleData(article);
    });
  },[getArticle, match.url]);
  const favorite = () => {
    likeButton.current.classList.add(classes["liked"]);
  };
  const {
    title,
    favoritesCount,
    author,
    createdAt,
    tagList,
    description,
    body,
    favorited,
    slug,
  } = articleData;
  return (
    <div className={classes["single-article"]}>
      <header className={classes["single-article__header"]}>
        <h5 className={classes["title"]}>{title}</h5>
        <div className={classes["likes__content"]}>
          <button
            ref={likeButton}
            className={classes["likes__button"]}
            onClick={() => favorite()}
          ></button>
          <span className={classes["likes__count"]}>{favoritesCount}</span>
        </div>
        <div className={classes["author"]}>
          {author && <div className={classes.user}>
            <div className={classes['user__name']}>{author.username}</div>
            {createdAt && (
              <div className={classes['user__created']}>
                {format(new Date(createdAt), "PPP")}
              </div>
            )}
            <img
              className={classes['user__avatar']}
              src={author.image}
              alt={`${author.username}`}
            />
          </div>}
        </div>
      </header>
      <ul className={classes["tag__list"]}>
        {tagList &&
          tagList.map((tag, index) => (
            <li key={index} className={classes["tag"]}>
              {tag}
            </li>
          ))}
      </ul>
      <p className={classes["description"]}>{description}</p>
      <section className={classes["markdown"]}>
        <Markdown>{body}</Markdown>
      </section>
    </div>
  );
};

export default SingleArticle;
