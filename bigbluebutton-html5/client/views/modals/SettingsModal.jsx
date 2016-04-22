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
import FontSizeControl from '../../FontSizeControl.js';

export default class SettingsModal extends BaseModal {
  constructor(props) {
    super(props);
    this.submenus = [];
  }

  componentWillMount() {
    this.setState({activeSubmenu: 0});
    this.submenus.push({className: 'AudioMenu', props: { title: 'Audio', prependIconName: 'ion-', icon: 'ios-mic-outline'}});
    this.submenus.push({className: 'VideoMenu', props: { title: 'Video', prependIconName: 'ion-', icon: 'ios-videocam-outline'}});
    this.submenus.push({className: 'ApplicationMenu', props: { title: 'App', prependIconName: 'ion-', icon: 'ios-folder-outline'}});
    this.submenus.push({className: 'UsersMenu', props: { title: 'Participants', prependIconName: 'ion-', icon: 'person'}});
    this.submenus.push({className: 'SessionMenu', props: { title: 'Session', prependIconName: 'ion-', icon: 'android-exit'}});
  }

  createMenu() {
    const curr = this.state.activeSubmenu === undefined ? 0 : this.state.activeSubmenu;

    let props = {
      fontSizeControl: this.props.fontSizeControl,
      title: this.submenus[curr].props.title,
      prependIconName: this.submenus[curr].props.prependIconName,
      icon: this.submenus[curr].props.icon,
    };

    switch (this.submenus[curr].className) {
      case 'AudioMenu': {
        return <AudioMenu {...props}/>;
      }
      case 'VideoMenu': {
        return <VideoMenu {...props}/>;
      }
      case 'ApplicationMenu': {
        return <ApplicationMenu {...props}/>;
      }
      case 'UsersMenu': {
        return <UsersMenu {...props}/>;
      }
      case 'SessionMenu': {
        return <SessionMenu {...props}/>;
      }
    }
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
          <ul style={{listStyleType: 'none', fontSize: this.props.fontSizeControl.getListSize() + 'px'}}>
            {this.submenus.map((value, index) => (
              <li key={index} onClick={this.clickSubmenu.bind(this, index)}
                className={classNames('settingsSubmenuItem', {'settingsSubmenuItemActive': index == this.state.activeSubmenu})}>
                <Icon key={index} prependIconName={value.props.prependIconName} iconName={value.props.icon} title={value.props.title}/>
                <span> - {value.props.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="settingsMenuRight">{this.createMenu()}</div>
      </div>
    );
  }
};
