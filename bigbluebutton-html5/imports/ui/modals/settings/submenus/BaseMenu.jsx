import React from 'react';
import Modal from 'react-modal';
import {Icon} from '/imports/ui/Icon.jsx';
import {Button} from '/imports/ui/Button.jsx';

export default class BaseMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    return(<div>parent content</div>);
  }

  render() {
    return (
      <div>
        <h3 className="mediumFont">{this.props.title}</h3>
        <div>
          {this.getContent()}
        </div>
      </div>
    );
  }
};
