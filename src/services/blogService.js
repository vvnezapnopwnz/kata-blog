class blogService {
  constructor() {
    this.apiBase = "https://blog.kata.academy/api";
  }

  getResources = async (resource) => {
    // console.log(`${this.apiBase}/${resource}`)
    const res = await fetch(`${this.apiBase}/${resource}`);
    return await res.json();
  };

  getArticles = async (offset = 0) => {
    const res = this.getResources(`articles?limit=5&offset=${offset}`);
    // const result = await articles.json();
    return res
  }

  getArticle = async (slug) => {
    const res = this.getResources(`${slug}`);
    // const result = await articles.json();
    // console.log(res)
    return res
  }
}

export default new blogService()