import {Deskshare} from '../../api/deskshare.js';

// when the meeting information has been updated check to see if it was
// desksharing. If it has changed either trigger a call to receive video
// and display it, or end the call and hide the video
export function videoIsBroadcasting() {
  const ds = Deskshare.findOne({});
  if (ds == null || !ds.deskshare.broadcasting) {
    console.log('Deskshare broadcasting has ended');
    presenterDeskshareHasEnded();
    return false;
  }

  if (ds.deskshare.broadcasting) {
    console.log('Deskshare is now broadcasting');
    if (ds.deskshare.startedBy != getInSession("userId")) {
      console.log('deskshare wasn\'t initiated by me');
      presenterDeskshareHasStarted();
      return true;
    } else {
      presenterDeskshareHasEnded();
      return false;
    }
  }
}

// Periodically check the status of the WebRTC call, when a call has been established attempt to hangup,
// retry if a call is in progress, send the leave voice conference message to BBB
export function exitVoiceCall(event, afterExitCall) {
  if (!Meteor.config.useSIPAudio) {
    leaveWebRTCVoiceConference_verto();
    cur_call = null;
    return;
  } else {
    // To be called when the hangup is initiated
    hangupCallback = function() {
      console.log('Exiting Voice Conference');
    }

    // Checks periodically until a call is established so we can successfully end the call
    // clean state
    getInSession("triedHangup", false);
    // function to initiate call
    checkToHangupCall = (function(context) {
      // if an attempt to hang up the call is made when the current session is not yet finished, the request has no effect
      // keep track in the session if we haven't tried a hangup
      if (BBB.getCallStatus() != null && !getInSession("triedHangup")) {
        console.log('Attempting to hangup on WebRTC call');
        if (BBB.amIListenOnlyAudio()) { // notify BBB-apps we are leaving the call call if we are listen only
          Meteor.call('listenOnlyRequestToggle', BBB.getMeetingId(), BBB.getMyUserId(), BBB.getMyAuthToken(), false);
        }
        BBB.leaveVoiceConference(hangupCallback);
        getInSession("triedHangup", true); // we have hung up, prevent retries
        notification_WebRTCAudioExited();
        if (afterExitCall) {
          afterExitCall(this, Meteor.config.app.listenOnly);
        }
      } else {
        console.log(`RETRYING hangup on WebRTC call in ${Meteor.config.app.WebRTCHangupRetryInterval} ms`);
        setTimeout(checkToHangupCall, Meteor.config.app.WebRTCHangupRetryInterval); // try again periodically
      }
    })(this); // automatically run function
    return false;
  };
}

// join the conference. If listen only send the request to the server
export function joinVoiceCall(event, options) {
  let extension = null;
  if (options.extension) {
    extension = options.extension;
  } else {
    extension = Meteor.Meetings.findOne().voiceConf;
  }

  conferenceUsername = "FreeSWITCH User - " + encodeURIComponent(Meteor.Users.findOne({userId: getInSession("userId")}).user.name);
  conferenceIdNumber = "1009";
  if (!isWebRTCAvailable()) {
    notification_WebRTCNotSupported();
    return;
  }

  if (!Meteor.config.useSIPAudio) {
    if (options.watchOnly) {
      toggleWhiteboardVideo("video");
    }

    const vertoServerCredentials = {
      vertoPort: Meteor.config.vertoPort,
      hostName: Meteor.config.vertoServerAddress,
      login: conferenceIdNumber,
      password: Meteor.config.freeswitchProfilePassword,
    };

    let wasCallSuccessful = false;
    let debuggerCallback = function(message) {
      console.log('CALLBACK: '+JSON.stringify(message));
      //
      // Beginning of hacky method to make Firefox media calls succeed.
      // Always fail the first time. Retry on failure.
      //
      if (!!navigator.mozGetUserMedia && message.errorcode == 1001) {
        callIntoConference_verto(extension, conferenceUsername, conferenceIdNumber, function(m) { console.log("CALLBACK: "+JSON.stringify(m)); }, "webcam", options, vertoServerCredentials);
      }
      //
      // End of hacky method
      //
    };
    callIntoConference_verto(extension, conferenceUsername, conferenceIdNumber, debuggerCallback, "webcam", options, vertoServerCredentials);
    return;
  } else {
    // create voice call params
    let joinCallback = function(message) {
      console.log('Beginning WebRTC Conference Call');
    };

    notification_WebRTCAudioJoining();
    if (options.isListenOnly) {
      Meteor.call('listenOnlyRequestToggle', BBB.getMeetingId(), BBB.getMyUserId(), BBB.getMyAuthToken(), true);
    }

    const requestedListenOnly = options.isListenOnly;
    BBB.joinVoiceConference(joinCallback, requestedListenOnly); // make the call //TODO should we apply role permissions to this action?

    return false;
  }
}

// if remote deskshare has been ended disconnect and hide the video stream
export function presenterDeskshareHasEnded() {
  // exitVoiceCall();
};

// if remote deskshare has been started connect and display the video stream
export function presenterDeskshareHasStarted() {
  // voiceBridge = extension = Deskshare.findOne().deskshare.voice_bridge;
  // joinVoiceCall(this, {
  //   watchOnly: true
  //   extension: extension
  // });
};
