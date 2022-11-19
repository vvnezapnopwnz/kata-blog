class blogService {
  constructor() {
    this.apiBase = "https://blog.kata.academy/api";
  }

  getResources = async (resource, options = null) => {
    // console.log(`${this.apiBase}/${resource}`)
    const res = await fetch(`${this.apiBase}/${resource}`, options);
    return await res.json();
  };

  getArticles = async (offset = 0) => {
    const res = this.getResources(`articles?limit=5&offset=${offset}`);
    // const result = await articles.json();
    return res;
  };

  getArticle = async (slug) => {
    const res = this.getResources(`${slug}`);
    // const result = await articles.json();
    // console.log(res)
    return res;
  };

  loginUser = async ({ email, password }) => {
    const res = this.getResources("users/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    return res;
  };

  registerUser = async ({ email, password, username }) => {
    const res = this.getResources("users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
        },
      }),
    });
    return res;
  };

  updateUser = async ({ email, password, username, image, token }) => {
    // console.log("updateUser", token);
    const res = this.getResources("user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          image: image,
          token: token,
        },
      }),
    });
    return res;
  };

  getUser = async ({ token }) => {
    // console.log(token);
    const res = this.getResources("user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  };
}

export default blogService;
