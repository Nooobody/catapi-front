
export default class API {
  constructor(url) {
    this.url = url;
  }

  async getAllBreeds() {
    let resp = await fetch(`http://${this.url}/breed`);
    return resp.json();
  }

  async searchByName(name) {
    let resp = await fetch(`http://${this.url}/breed/search/${name}`)
    return resp.json();
  }
}
