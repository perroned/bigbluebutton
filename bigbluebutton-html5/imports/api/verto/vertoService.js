function joinAudio(options) {
}

function watchVideo(options) {
}

function joinVertoCall(options) {
  let extension = null;
  if (options.extension) {
    extension = options.extension;
  } else {
    extension = Meteor.Meetings.findOne().voiceConf;
  }

  conferenceUsername = "FreeSWITCH User - " + encodeURIComponent(Meteor.Users.findOne({userId: getInSession("userId")}).user.name);
  conferenceIdNumber = "1009";
  if (!isWebRTCAvailable()) {
    return;
  }

  if (!Meteor.config.useSIPAudio) {
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
  }
}
