class blogService {
  constructor() {
    this.apiBase = 'https://blog.kata.academy/api'
  }

  getResources = async (resource, options = null) => {
    const res = await fetch(`${this.apiBase}/${resource}`, options)
    return await res.json()
  }

  getArticles = async (offset = 0) => {
    if (localStorage.getItem('token')) {
      const res = this.getResources(`articles?limit=5&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      return res
    }
    const res = this.getResources(`articles?limit=5&offset=${offset}`)
    return res
  }

  getArticle = async (slug) => {
    if (localStorage.getItem('token')) {
      const res = this.getResources(`${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      return res
    }

    const res = this.getResources(`${slug}`)
    return res
  }

  loginUser = async ({ email, password }) => {
    const res = this.getResources('users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
    return res
  }

  registerUser = async ({ email, password, username }) => {
    const res = this.getResources('users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
        },
      }),
    })
    return res
  }

  updateUser = async ({ email, password, username, image, token }) => {
    const res = this.getResources('user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          image: image,
          token: token,
        },
      }),
    })
    return res
  }

  getUser = async ({ token }) => {
    const res = this.getResources('user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  }

  createArticle = async ({ title, description, body, tags }) => {
    await this.getResources('articles', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tags,
        },
      }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server')
        }
        return response
      })
      .catch((error) => {
        return error
      })
  }

  editArticle = async ({ title, description, body, tags }, slug) => {
    await this.getResources(`articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tags,
        },
      }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server')
        }
        return response
      })
      .catch((error) => {
        return error
      })
  }

  deleteArticle = async (slug) => {
    await this.getResources(`articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server')
        }
        return response
      })
      .catch((error) => {
        return error
      })
  }

  favoriteArticle = async (slug, liked) => {
    return await this.getResources(`articles/${slug}/favorite`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: `${liked ? 'POST' : 'DELETE'}`,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server')
        }
        return response.article
      })
      .catch((error) => {
        return error
      })
  }
}

export default blogService
