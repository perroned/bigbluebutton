import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';
import BaseModal from './BaseModal.jsx';
import AudioMenu from './AudioMenu.jsx';
import VideoMenu from './VideoMenu.jsx';
import ApplicationMenu from './ApplicationMenu.jsx';
import UsersMenu from './UsersMenu.jsx';
import SessionMenu from './SessionMenu.jsx';
import classNames from 'classnames';

export default class SettingsModal extends BaseModal {
  constructor(props) {
    super(props);
    this.submenus = [];
  }

  componentDidMount() {
    this.setState({activeSubmenu: 0});
    this.submenus.push(<AudioMenu title="Audio" prependIconName="ion-" icon="ios-mic-outline"/>);
    this.submenus.push(<VideoMenu title="Video" prependIconName="ion-" icon="ios-videocam-outline"/>);
    this.submenus.push(<ApplicationMenu title="App" prependIconName="ion-" icon="ios-folder-outline"/>);
    this.submenus.push(<UsersMenu title="Participants" prependIconName="ion-" icon="person"/>);
    this.submenus.push(<SessionMenu title="Session" prependIconName="ion-" icon="android-exit"/>);
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

  clickSubmenu(i) {
    this.setState({activeSubmenu: i});
  }

  getContent() {
    return(
      <div>
        <div className="settingsMenuLeft">
          <ul style={{listStyleType: 'none'}}>
            {this.submenus.map((value, index) => (
              <li key={index} onClick={this.clickSubmenu.bind(this, index)}
                className={classNames('settingsSubmenuItem', {'activeRow': index == this.state.activeSubmenu})}>
                <Icon key={index} prependIconName={value.props.prependIconName} iconName={value.props.icon} title={value.props.title}/>
                  <span>{value.props.title}</span>
              </li>  
            ))}
          </ul>
        </div>
        <div className="settingsMenuRight">
          {this.submenus[this.state.activeSubmenu === undefined ? 0 : this.state.activeSubmenu]}
        </div>
      </div>
    );
  }
};
