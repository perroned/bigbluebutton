this.addPollToCollection = function (poll, requester_id, users, meetingId) {
  let _users, answer, entry, i, j, user;
  // copying all the userids into an array
  _users = [];
  _users_length = users.length;
  for (i = 0; i < _users_length; i++) {
    user = users[i];
    _users.push(user.user.userid);
  }

  // adding the initial number of votes for each answer
  //
  // _answers = poll.answers;
  // _answers_length = _answers.length;
  // for (j = 0; j < _answers_length; j++) {
  //   answer = _answers[j];
  //   answer.num_votes = 0;
  // }

  // adding the initial number of responders and respondents to the poll, which will be displayed for presenter (in HTML5 client) when he starts the poll
  num_responders = -1;
  num_respondents = -1;

  // adding all together and inserting into the Polls collection
  entry = {
    meetingId: meetingId,
    poll: poll,
    requester: requester_id,
    users: _users,
    num_responders: -1,
    num_respondents: -1,
  };
  Meteor.log.info(`added poll _id=[${poll.id}]:meetingId=[${meetingId}].`);
  return Meteor.Polls.insert(entry);
};

this.clearPollCollection = function (meetingId, poll_id) {
  if (meetingId != null && poll_id != null && Meteor.Polls.findOne({
    'poll_info.meetingId': meetingId,
    'poll_info.poll.id': poll_id,
  }) != null) {
    return Meteor.Polls.remove({
      'poll_info.meetingId': meetingId,
      'poll_info.poll.id': poll_id,
    }, Meteor.log.info(`cleared Polls Collection (meetingId: ${meetingId}, pollId: ${poll_id}!)`));
  } else {
    return Meteor.Polls.remove({}, Meteor.log.info('cleared Polls Collection (all meetings)!'));
  }
};

this.updatePollCollection = function (poll, meetingId, requesterId) {
  if ((poll.answers != null) && (poll.num_responders != null) && (poll.num_respondents != null) && (poll.id != null) && (meetingId != null) && (requesterId != null)) {
    return Meteor.Polls.update({
      'meetingId': meetingId,
      'requester': requesterId,
      'poll.id': poll.id,
    }, {
      $set: {
        'poll.answers': poll.answers,
        'poll.num_responders': poll.num_responders,
        'poll.num_respondents': poll.num_respondents,
      },
    }, Meteor.log.info(`updating Polls Collection (meetingId: ${meetingId}, pollId: ${poll.id}!)`));
  }
};
