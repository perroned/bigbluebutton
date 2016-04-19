import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';
import BaseMenu from './BaseMenu.jsx';

export default class ApplicationMenu extends BaseMenu {
  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div>
        <p style={{float: 'left'}}>Audio notifications for chat</p>
        <p style={{float: 'right'}}>audio not</p>
        <p>fsdfds</p>
        <p style={{float: 'left'}}>Push notifications for chat</p>
        <p style={{float: 'right'}}>push not</p>
        <br />
        <div style={{clear: 'both'}}>
          <div style={{float: 'left', width: '25%', textAlign: 'left'}}>purple</div>
          <div style={{float: 'left', width: '50%', textAlign: 'center'}}>monkey</div>
          <div style={{float: 'left', width: '25%', textAlign: 'right'}}>dishwasher</div>
        </div>
      </div>
    );
  }
};
