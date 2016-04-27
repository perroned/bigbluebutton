import React from 'react';
import Modal from 'react-modal';
import {Icon} from '/imports/ui/Icon.jsx';
import {Button} from '/imports/ui/Button.jsx';
import BaseMenu from './BaseMenu.jsx';

export default class AudioMenu extends BaseMenu {
  constructor(props) {
    super(props);
  }

  getContent() {
    return (
      <div>
        <p>inside audio menu</p>
      </div>
    );
  }
};
