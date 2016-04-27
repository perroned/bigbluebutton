const fontSizeEnum = {
  EXTRA_SMALL: 1,
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 4,
  EXTRA_LARGE: 5,

  properties: {
    1: {size: "12px", name: "Extra Small"},
    2: {size: "16px", name: "Small"},
    3: {size: "18px", name: "Medium"},
    4: {size: "24px", name: "Large"},
    5: {size: "26px", name: "Extra Large"},
  }
};

function applyFontSize() {
  document.getElementsByTagName("html")[0].style.fontSize = fontSizeEnum.properties[this.state.currentFontSize].size;
}

function storeFontSize(fs) {
  localStorage.setItem('bbbFontSize', fs);
  this.setState({currentFontSize: fs}, function() {
    applyFontSize.call(this)
  });
}

function getFontSizeName() {
  return fontSizeEnum.properties[this.state.currentFontSize].name;
}

function increaseFontSize() {
  let fs = this.state.currentFontSize;
  if (++fs >= fontSizeEnum.EXTRA_LARGE) {
    fs = fontSizeEnum.EXTRA_LARGE;
  }
  storeFontSize.call(this, fs);
};

function decreaseFontSize() {
  let fs = this.state.currentFontSize;
  if (--fs <= fontSizeEnum.EXTRA_SMALL) {
    fs = fontSizeEnum.EXTRA_SMALL;
  }
  storeFontSize.call(this, fs);
};

export {increaseFontSize, decreaseFontSize, getFontSizeName, fontSizeEnum};
