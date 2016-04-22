export default class BindableObject {
  constructor() {}

  _bind(parent, child, ...methods) {
    methods.forEach( (method) => parent[child][method] = parent[child][method].bind(parent));
  }
}
