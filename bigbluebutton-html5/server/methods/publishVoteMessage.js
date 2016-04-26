Meteor.methods({
  publishVoteMessage(pollId, pollAnswerId, meetingId, requesterUserId, requesterToken) {
    let _poll_id, eventName, message, result;
    if (isAllowedTo('subscribePoll', meetingId, requesterUserId, requesterToken)) {
      eventName = 'vote_poll_user_request_message';

      result = Meteor.Polls.findOne({
        'users': { $in: [requesterUserId] },
        'meetingId': meetingId,
        'poll.answers.id': { $in: [pollAnswerId] },
        'poll.id': pollId
      });

      if ((eventName != null) && (result.meetingId != null) && (requesterUserId != null) && (pollAnswerId != null)) {
        message = {
          payload: {
            meeting_id: result.meetingId,
            user_id: requesterUserId,
            poll_id: result.poll.id,
            question_id: 0,
            answer_id: pollAnswerId,
          },
        };
        Meteor.Polls.update({
          'users': { $in: [requesterUserId] },
          'meetingId': meetingId,
          'poll.answers.id': { $in: [pollAnswerId] },
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
