import BindableObject from './BindableObject.js';

export default class FontSizeControl extends BindableObject {
  constructor() { super() }

  init(context, name) {
    super._bind(context, name, 'calculateHeader', 'changeFontSize', 'getFontSize');
  }

  calculateHeader(size) {
    return size * 2;
  };

  changeFontSize() {
    this.setState({
      fontSize: this.state.fontSize + 1000
    });
  };

  getFontSize () {
    return this.state.fontSize;
  };
};
