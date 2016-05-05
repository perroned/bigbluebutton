import React from 'react';
import {Header} from '/imports/ui/main/Header.jsx';
import {Whiteboard} from '/imports/ui/whiteboard/Whiteboard.jsx';
import {Chat} from '/imports/ui/chat/Chat.jsx';
import PollingContainer from '/imports/ui/polling/PollingContainer.jsx';
import DeskshareContainer from '/imports/ui/deskshare/DeskshareContainer.jsx';
import SettingsModal from '/imports/ui/modals/settings/SettingsModal.jsx';
import ReactDOM from 'react-dom';
import {Button} from '/imports/ui/Button.jsx';
import {Icon} from '/imports/ui/Icon.jsx';

MainContainer = React.createClass({
  handleShield() {
    $('.tooltip').hide();
    toggleShield();
    return closeMenus();
  },

  componentDidMount() {
    ReactDOM.render(
      <Button componentClass='span' onClick={this.refs['settingsModal'].openModal} className='btn settingsIcon navbarButton' i_class='icon ion-gear-b' rel='tooltip' title='Settings'>
        <Icon iconName='icon ion-gear-b' className='mediumFont icon ion-gear-b'/>
      </Button>
    , document.getElementById('settingsButtonPlaceHolder'));
  },


  render() {
    return (
      <div id="testing">
        <Header />
          <div id="panels">
            <div onClick={this.handleShield} className="shield"></div>
            <DeskshareContainer />
            <Whiteboard />
            <Chat />
            <PollingContainer />
            <SettingsModal ref="settingsModal" />
          </div>
      </div>
    );
  },
});
