import BindableObject from './BindableObject.js';

export default class FontSizeControl extends BindableObject {
  constructor() {
    super();
    _this = this;
  }

  init(context, name) {
    super._bind(context, name, 'setFontSize', 'increaseFontSize', 'decreaseFontSize', 'getFontSize', 'getTitleSize', 'getHeaderSize', 'getListSize', 'getContentSize');
  }

  getContentSize() {
    return _this.getFontSize() * 1;
  };

  getListSize() {
    return _this.getFontSize() * 1;
  };

  getHeaderSize() {
    return _this.getFontSize() * 2;
  };

  getTitleSize() {
    return _this.getFontSize() * 3;
  }

  setFontSize(newSize) {
    this.setState({
      fontSize: newSize
    });
  };

  increaseFontSize() {
    let fs = this.state.fontSize;
    if (++fs >= FontSizeControl.fontSizeEnum.EXTRA_LARGE) {
      fs = FontSizeControl.fontSizeEnum.EXTRA_LARGE;
    }

    this.setState({
      fontSize: fs
    });
  };

  decreaseFontSize() {
    let fs = this.state.fontSize;
    if (--fs <= FontSizeControl.fontSizeEnum.SMALL) {
      fs = FontSizeControl.fontSizeEnum.SMALL;
    }

    this.setState({
      fontSize: fs
    });
  };

  getFontSize() {
    return FontSizeControl.fontSizeEnum.properties[this.state.fontSize].size;
  };
};

FontSizeControl.fontSizeEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  EXTRA_LARGE: 4,

  properties: {
    1: {size: 12},
    2: {size: 16},
    3: {size: 18},
    4: {size: 24},
  }
};
