export default class RottenTomatoes {

  static init(config) {
    this.config = config;
  }

  get(endpoint, params, callback) {
    console.log(this.config);
  }
}
