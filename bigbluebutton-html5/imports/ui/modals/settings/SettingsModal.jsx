import React from 'react';
import Modal from 'react-modal';
import {Icon} from '/imports/ui/Icon.jsx';
import {Button} from '/imports/ui/Button.jsx';
import BaseModal from '../BaseModal.jsx';
import AudioMenu from './submenus/AudioMenu.jsx';
import VideoMenu from './submenus/VideoMenu.jsx';
import ApplicationMenu from './submenus/ApplicationMenu.jsx';
import UsersMenu from './submenus/UsersMenu.jsx';
import SessionMenu from './submenus/SessionMenu.jsx';
import classNames from 'classnames';

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
          <ul style={{listStyleType: 'none'}}>
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
