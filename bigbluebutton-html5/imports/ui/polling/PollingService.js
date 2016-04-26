let mapPolls = function () {
  let poll = Meteor.Polls.findOne({});
  if (!poll) {
    return { pollExists: false };
  }
  const amIRequester = poll.requester != getInSession('userId');

  return {
    poll: {
      answers: poll.poll.answers,
    },
    pollExists: true,
    amIRequester: amIRequester
  };
}

export default {mapPolls};
