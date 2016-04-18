import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';
import BaseModal from './BaseModal.jsx';
import AudioMenu from './AudioMenu.jsx';
import VideoMenu from './VideoMenu.jsx';
import ApplicationMenu from './ApplicationMenu.jsx';
import UsersMenu from './UsersMenu.jsx';
import SessionMenu from './SessionMenu.jsx';

export default class SettingsModal extends BaseModal {
  constructor(props) {
    super(props);
    this.submenus = [];
  }

  componentDidMount() {
    this.setState({activeSubmenu: 0});
    this.submenus.push(React.createElement(AudioMenu, {title: "Audio Menu"}));
    this.submenus.push(React.createElement(VideoMenu, {title: "Video Menu"}));
    this.submenus.push(React.createElement(ApplicationMenu, {title: "Audio Menu"}));
    this.submenus.push(React.createElement(UsersMenu, {title: "Audio Menu"}));
    this.submenus.push(React.createElement(SessionMenu, {title: "Audio Menu"}));
  }

  openModal() {
    super.openModal();
  }

  closeModal() {
    super.closeModal();
  }

  afterOpenModal() {
    super.afterOpenModal();
  }

  handleModalCloseRequest() {
    super.handleModalCloseRequest();
  }

  getContent() {
    let activeRow = { borderRight: '5px solid blue' };
    return(
      <div>
        <div style={{float: 'left', width: '30%', borderRight: '2px solid grey'}}>
          <ul>
            {this.submenus.map((value, index) => (
              <li key={index} style={index == this.state.activeSubmenu ? activeRow : null}>{value.props.title}</li>
            ))}
          </ul>
        </div>
        <div style={{float: 'right', width: '70%'}}>
          {this.submenus[this.state.activeSubmenu === undefined ? 0 : this.state.activeSubmenu]}
        </div>
      </div>
    );
  }
};
