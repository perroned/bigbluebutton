import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';
import BaseMenu from './BaseMenu.jsx';

export default class AudioMenu extends BaseMenu {
  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div>
        <p>inside audio menu</p>
        <p>props.FontSize - {this.props.FontSize.size}</p>
      </div>
    );
  }
};
