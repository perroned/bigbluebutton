import {Deskshare} from '../../api/deskshare.js';

// when the meeting information has been updated check to see if it was
// desksharing. If it has changed either trigger a call to receive video
// and display it, or end the call and hide the video
function videoIsBroadcasting() {
  const ds = Deskshare.findOne({});
  if (ds == null || !ds.broadcasting) {
    console.log('Deskshare broadcasting has ended');
    presenterDeskshareHasEnded();
    return false;
  }

  if (ds.broadcasting) {
    console.log('Deskshare is now broadcasting');
    if (ds.startedBy != getInSession("userId")) {
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
// export function exitVoiceCall(event, afterExitCall) {
//   if (!Meteor.config.useSIPAudio) {
//     leaveWebRTCVoiceConference_verto();
//     cur_call = null;
//     return;
//   } else {
//     // To be called when the hangup is initiated
//     hangupCallback = function() {
//       console.log('Exiting Voice Conference');
//     }
//
//     // Checks periodically until a call is established so we can successfully end the call
//     // clean state
//     getInSession("triedHangup", false);
//     // function to initiate call
//     checkToHangupCall = (function(context) {
//       // if an attempt to hang up the call is made when the current session is not yet finished, the request has no effect
//       // keep track in the session if we haven't tried a hangup
//       if (BBB.getCallStatus() != null && !getInSession("triedHangup")) {
//         console.log('Attempting to hangup on WebRTC call');
//         if (BBB.amIListenOnlyAudio()) { // notify BBB-apps we are leaving the call call if we are listen only
//           Meteor.call('listenOnlyRequestToggle', BBB.getMeetingId(), BBB.getMyUserId(), BBB.getMyAuthToken(), false);
//         }
//         BBB.leaveVoiceConference(hangupCallback);
//         getInSession("triedHangup", true); // we have hung up, prevent retries
//         notification_WebRTCAudioExited();
//         if (afterExitCall) {
//           afterExitCall(this, Meteor.config.app.listenOnly);
//         }
//       } else {
//         console.log(`RETRYING hangup on WebRTC call in ${Meteor.config.app.WebRTCHangupRetryInterval} ms`);
//         setTimeout(checkToHangupCall, Meteor.config.app.WebRTCHangupRetryInterval); // try again periodically
//       }
//     })(this); // automatically run function
//     return false;
//   };
// }

function watchDeskshare(event, options) {
  let extension = null;
  if (options.extension) {
    extension = options.extension;
  } else {
    extension = Meteor.Meetings.findOne().voiceConf;
  }

  conferenceUsername = "FreeSWITCH User - " + encodeURIComponent(Meteor.Users.findOne({userId: getInSession("userId")}).user.name);
  conferenceIdNumber = "1009";

  // vertoService.watchVideo();
}

// if remote deskshare has been ended disconnect and hide the video stream
function presenterDeskshareHasEnded() {
  // exitVoiceCall();
};

// if remote deskshare has been started connect and display the video stream
function presenterDeskshareHasStarted() {
  // const voiceBridge = Deskshare.findOne().deskshare.voice_bridge;
  // watchDeskshare({
  //   watchOnly: true
  //   extension: voiceBridge
  // });
};

export {videoIsBroadcasting, watchDeskshare, presenterDeskshareHasEnded, presenterDeskshareHasStarted};
