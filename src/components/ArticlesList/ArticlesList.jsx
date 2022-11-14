import { Pagination, List } from "antd";
import { format } from 'date-fns'
import React, { useState, useEffect } from "react";
import classes from "./ArticlesList.module.scss";
import blogService from "../../services/blogService";
const ArticlesList = ()=> {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    blogService.getArticles().then(({ articles }) => {
      console.log(articles);
      setArticlesData(articles);
    });
  }, []);

  return (
    <div className={classes["Articles"]}>
      <List
        className={classes["ArticlesList"]}
        itemLayout="vertical"
        size="large"
        pagination={{
          style: { "flexDirection": "row" },
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={articlesData}
        renderItem={(item, i) => (
          <List.Item
            key={item.i}
          >
            <List.Item.Meta
            />
            <div className={classes["ArticlesListItem"]}>
              <header>
                <a href={`${item.slug}`}>
                  {item.title}
                </a>
              </header>
              <ul >
              </ul>
              <div >{item.description}</div>
              <div >
                <div>
                  {item.createdAt && (
                    <div>
                      {format(new Date(item.createdAt), "PPP")}
                    </div>
                  )}
                  <img alt=""
                  />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticlesList;
