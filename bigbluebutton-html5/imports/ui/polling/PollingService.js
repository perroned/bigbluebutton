let mapPolls = function () {
  let poll = Meteor.Polls.findOne({})
  if (!poll) {
    return { pollExists: false };
  }

  return {
    poll: {
      answers: poll.poll.answers,
    },
    pollExists: poll != null,
  };
}

export default {mapPolls};
