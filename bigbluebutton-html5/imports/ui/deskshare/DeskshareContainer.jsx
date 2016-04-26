import React from 'react';
import DeskshareService from './DeskshareService.js';
import { createContainer } from 'meteor/react-meteor-data';
import DeskshareComponent from './DeskshareComponent.jsx';

class DeskshareContainer extends React.Component {
  render() {
    if (this.props.videoIsBroadcasting) {
      return (<div>deskshare has started-- hide whiteboard / show video</div>);
    } else {
      return (<div>deskshare has ended-- show whiteboard / hide video</div>);
    }
  }
}

export default createContainer(() => {
  return {
    videoIsBroadcasting: DeskshareService.videoIsBroadcasting(),
  };
}, DeskshareContainer);
