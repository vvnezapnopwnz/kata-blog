import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import id from 'uuid/v1'

import classes from './ArticleForm.module.scss'

function ArticleForm({ onSubmit, articleData }) {
  const {
    register,
    control,
    handleSubmit,
    unregister,
    reset,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    if (articleData) {
      if (articleData.tagList) {
        setData(articleData.tagList.map(() => ({ id: id() })))
      }
    }

    if (articleData) {
      reset({
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
      })
    }
  }, [articleData, reset])

  const [data, setData] = useState([])
  const append = () => {
    setData([...data, { id: id() }])
  }
  const remove = (index, id) => {
    unregister(`tags.${id}`)
    setData([...data.slice(0, index), ...data.slice(index + 1)])
  }

  const addButton = (
    <button className={classes.Add_Button} type="button" onClick={() => append()}>
      Add tag
    </button>
  )

  return (
    <section className={classes.Create_article}>
      <form onSubmit={(e) => e.preventDefault()} className={classes.Create_article_Form}>
        <h2 className={classes.Form_Title}>{articleData ? 'Edit article' : 'Create article'}</h2>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="title">
            Title
          </label>
          <input
            className={classes.Input}
            placeholder="Title"
            name="title"
            {...register('title', {
              required: 'title is required',
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="email">
            Short description
          </label>
          <input
            className={classes.Input}
            name="description"
            {...register('description', {
              required: 'description is required',
            })}
            placeholder="description"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className={classes.Form_Item}>
          <label className={classes.Label} htmlFor="text">
            Text
          </label>
          <textarea
            className={classes.Input_Text}
            {...register('body', {
              required: 'text is required',
            })}
            name="body"
            placeholder="Text"
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>
        <ul className={classes.Tags_List}>
          {articleData && articleData.tagList
            ? data.map((item, index) => {
                let text = `${articleData.tagList[index]}`
                if (data.length - 1 === index && articleData.tagList.length !== data.length) {
                  text = ''
                }

                return (
                  <li key={item.id}>
                    <Controller
                      control={control}
                      name={`tags.${item.id}`}
                      value={text}
                      defaultValue={text}
                      render={({ field, value }) => (
                        <>
                          <input
                            className={classes.Input}
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            defaultValue={value}
                          />
                          <button className={classes.Delete_Button} onClick={() => remove(index, item.id)}>
                            Delete
                          </button>
                          {data.length - 1 === index ? addButton : null}
                        </>
                      )}
                    />
                  </li>
                )
              })
            : data.map((item, index) => (
                <li key={item.id}>
                  <Controller
                    control={control}
                    name={`tags.${item.id}`}
                    render={({ field, value }) => (
                      <>
                        <input
                          className={classes.Input}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          value={value}
                        />
                        <button className={classes.Delete_Button} onClick={() => remove(index, item.id)}>
                          Delete
                        </button>
                        {data.length - 1 === index ? addButton : null}
                      </>
                    )}
                  />
                </li>
              ))}
        </ul>
        {data.length !== 0 ? null : (
          <div>
            <button className={classes.Add_Button} type="button" onClick={() => append()}>
              Add tag
            </button>
          </div>
        )}

        <button className={classes.Submit} type="submit" onClick={handleSubmit(onSubmit)}>
          {articleData ? 'Edit' : 'Create'}
        </button>
      </form>
    </section>
  )
}
ArticleForm.defaultProps = {
  getArticles: () => {},
  onSubmit: () => {},
}

ArticleForm.propTypes = {
  getArticles: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  articleData: PropTypes.object.isRequired,
}

export default ArticleForm
