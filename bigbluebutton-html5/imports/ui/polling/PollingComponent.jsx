import React from 'react';
import {Button} from '../Button.jsx';

export default class PollingComponent extends React.Component {
  render() {
    const poll = this.props.poll;
    return (
      <div style={{ position: 'absolute', left: '50%', right: '25%', zIndex: '1' }}>
        {poll.answers.map((pollAnswer, index) => {
          return (
            <Button className="button mediumFont" key={index}
              onClick={() => this.props.handleVote(poll.pollId, pollAnswer)} componentClass="span">
              {pollAnswer.key}
            </Button>
          );
        })}
      </div>
    );
  }
};
