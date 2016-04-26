Meteor.methods({
  publishVoteMessage(meetingId, pollAnswerId, requesterUserId, requesterToken) {
    let _poll_id, eventName, message, result;
    if (isAllowedTo('subscribePoll', meetingId, requesterUserId, requesterToken)) {
      eventName = 'vote_poll_user_request_message';
      result = Meteor.Polls.findOne({
        'users': requesterUserId,
        'meetingId': meetingId,
        'poll.answers.id': pollAnswerId,
      }, {
        fields: {
          'poll.id': 1,
          _id: 0,
        },
      });
      _poll_id = result.poll_info.poll.id;
      if ((eventName != null) && (meetingId != null) && (requesterUserId != null) && (_poll_id != null) && (pollAnswerId != null)) {
        message = {
          payload: {
            meeting_id: meetingId,
            user_id: requesterUserId,
            poll_id: _poll_id,
            question_id: 0,
            answer_id: pollAnswerId,
          },
        };
        Meteor.Polls.update({
          'users': requesterUserId,
          'meetingId': meetingId,
          'poll.answers.id': pollAnswerId,
        }, {
          $pull: {
            'users': requesterUserId,
          },
        });
        message = appendMessageHeader(eventName, message);
        Meteor.log.info('publishing Poll response to redis');
        return publish(Meteor.config.redis.channels.toBBBApps.polling, message);
      }
    }
  }
});
