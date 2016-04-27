import React from 'react';
import {Header} from '/imports/ui/main/Header.jsx';
import {Whiteboard} from '/imports/ui/whiteboard/Whiteboard.jsx';
import {Chat} from '/imports/ui/chat/Chat.jsx';
import PollingContainer from '/imports/ui/polling/PollingContainer.jsx';
import DeskshareContainer from '/imports/ui/deskshare/DeskshareContainer.jsx';

MainContainer = React.createClass({
  handleShield() {
    $('.tooltip').hide();
    toggleShield();
    return closeMenus();
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
          </div>
      </div>
    );
  },
});
