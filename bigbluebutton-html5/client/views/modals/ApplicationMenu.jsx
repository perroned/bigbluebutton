import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';
import BaseMenu from './BaseMenu.jsx';
import FontSizeControl from '../../FontSizeControl.js';

export default class ApplicationMenu extends BaseMenu {
  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div style={{fontSize: 'inherit'}}>
        <p style={{float: 'left', fontSize: 'inherit'}}>Audio notifications for chat</p>
        <p style={{float: 'right', fontSize: 'inherit'}}>audio not</p>
        <p>fsdfds</p>
        <p style={{float: 'left', fontSize: 'inherit'}}>Push notifications for chat</p>
        <p style={{float: 'right', fontSize: 'inherit'}}>push not</p>
        <br />
        <div style={{clear: 'both'}}>
          <div style={{float: 'left', width: '25%', textAlign: 'left'}}>Font size</div>
          <div style={{float: 'left', width: '50%', textAlign: 'center'}}>{this.props.fontSizeControl.getFontSize()}</div>
          <div style={{float: 'left', width: '25%', textAlign: 'right'}}>
            <button onClick={this.props.fontSizeControl.increaseFontSize} style={{width:'20px', padding: '0px', margin: '0px'}}>+</button>
            <button onClick={this.props.fontSizeControl.decreaseFontSize} style={{width:'20px', padding: '0px', margin: '0px'}}>-</button>
          </div>
        </div>
      </div>
    );
  }
};
