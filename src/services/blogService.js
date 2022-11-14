class blogService {
  constructor() {
    this.apiBase = "https://blog.kata.academy/api/";
  }

  getResources = async (resource) => {
    const res = await fetch(`${this.apiBase}/${resource}`);
    return await res.json();
  };

  getArticles = async () => {
    const res = this.getResources("articles");
    // const result = await articles.json();
    return res
  }
}

export default new blogService()