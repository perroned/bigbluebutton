import React from 'react';
import Modal from 'react-modal';
import {Icon} from '/imports/ui/Icon.jsx';
import {Button} from '/imports/ui/Button.jsx';
import BaseMenu from './BaseMenu.jsx';
import ReactDOM from 'react-dom';
import {increaseFontSize, decreaseFontSize, getFontSizeName, fontSizeEnum} from './MenuService.js';

export default class ApplicationMenu extends BaseMenu {
  constructor(props) {
    super(props);
    this.state = {
      currentFontSize: fontSizeEnum.MEDIUM,
    };
  }

  getContent() {
    return (
      <div className="mediumFont">
        <p style={{ float: 'left' }}>Audio notifications for chat</p>
        <p style={{ float: 'right' }}>audio not</p>
        <p>fsdfds</p>
        <p style={{ float: 'left' }}>Push notifications for chat</p>
        <p style={{ float: 'right' }}>push not</p>
        <br />
        <div style={{ clear: 'both' }}>
          <div style={{ float: 'left', width: '25%', textAlign: 'left' }}>Font size</div>
          <div style={{ float: 'left', width: '50%', textAlign: 'center' }}>
            {getFontSizeName.call(this)}
          </div>
          <div style={{ float: 'left', width: '25%', textAlign: 'right' }}>
            <button className="fontSizeButton" onClick={increaseFontSize.bind(this)}>+</button>
            <button className="fontSizeButton" onClick={decreaseFontSize.bind(this)}>-</button>
          </div>
        </div>
      </div>
    );
  }
};
