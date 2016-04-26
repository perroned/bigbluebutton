let mapPolls = function () {
  let poll = Meteor.Polls.findOne({});
  if (!poll) {
    return { pollExists: false };
  }
  const amIRequester = poll.requester != getInSession('userId');

  return {
    poll: {
      answers: poll.poll.answers,
      pollId: poll.poll.id,
    },
    pollExists: true,
    amIRequester: amIRequester,
    handleVote: function(pollId, answerId) {
      Meteor.call('publishVoteMessage', pollId, answerId.id, BBB.getMeetingId(), getInSession('userId'), getInSession('authToken'));
    }
  };
}

export default {mapPolls};
