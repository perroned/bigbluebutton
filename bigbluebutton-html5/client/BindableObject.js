export default class BindableObject {
  constructor() {}

  _bind(obj1, obj, ...methods) {
    methods.forEach( (method) => obj1[obj][method] = obj1[obj][method].bind(obj1));
  }
}