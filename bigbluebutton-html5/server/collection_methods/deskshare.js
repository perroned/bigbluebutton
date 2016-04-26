import {Deskshare} from '../../imports/api/deskshare.js';

export function handleDeskShareChange(meetingId, deskshareInfo) {
  console.error(`__${meetingId}__deskshareInfo= + ${JSON.stringify(deskshareInfo)}`);
  const presenter = Meteor.Users.findOne({meetingId: meetingId, 'user.presenter':  true}).user.userid;
  Deskshare.upsert({ meetingId: meetingId}, {$set: {
    'deskshare.broadcasting': deskshareInfo.broadcasting,
    'deskshare.timestamp': 'now',
    'deskshare.vw': deskshareInfo.vw,
    'deskshare.vh': deskshareInfo.vh,
    'deskshare.voice_bridge': deskshareInfo.voice_bridge,
    'deskshare.startedBy': presenter,
  }});
}

export function clearDeskshareCollection(meetingId) {
  if (meetingId != null) {
    Deskshare.remove({meetingId: meetingId}, function() {
      Meteor.log.info(`cleared Deskshare Collection (meetingId: ${this.meetingId}!)`);
    });
  } else {
    Deskshare.remove({}, function() {
      Meteor.log.info(`cleared Deskshare Collection (all meetings)!`);
    });
  }
}
