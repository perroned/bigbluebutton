import React from 'react';
import PollingService from './PollingService.js';
import { createContainer } from 'meteor/react-meteor-data';
import PollingComponent from './PollingComponent.jsx';

class PollingContainer extends React.Component {
  render() {
    if (this.props.pollExists) {
      return <PollingComponent poll={this.props.poll} handleVote={this.props.handleVote} />;
    } else {
      return null;
    }
  }
}

export default createContainer(() => {
  return PollingService.mapPolls();
}, PollingContainer);
