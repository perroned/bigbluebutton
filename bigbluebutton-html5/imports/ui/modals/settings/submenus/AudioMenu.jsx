import React from 'react';
import Modal from 'react-modal';
import {Icon} from '/imports/ui/Icon.jsx';
import {Button} from '/imports/ui/Button.jsx';
import BaseMenu from './BaseMenu.jsx';
import {joinVoiceCall} from '/imports/ui/phone/PhoneService.js';

export default class AudioMenu extends BaseMenu {
  constructor(props) {
    super(props);
  }

  getContent() {
    const useSIPAudio = true;
    const isListenOnly = true;
    return (
      <div>
        <p>inside audio menu</p>
        <button onClick={joinVoiceCall.bind(this, {useSIPAudio, isListenOnly})}>join audio</button>
      </div>
    );
  }
};
