import React from 'react';
import {Button} from '../Button.jsx';

export default class PollingComponent extends React.Component {
  handleVote(context) {
    console.log(context);
  }

  render() {
    const poll = this.props.poll;
    return(
      <div>
        {poll.answers.map((pollAnswer, index) => {
            return(
              <Button className="button" key={index} onClick={() => this.handleVote(pollAnswer)} componentClass="span">
                {pollAnswer.key}
              </Button>
            );
          })}
      </div>
    )
  }
};
