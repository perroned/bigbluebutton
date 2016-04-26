let mapPolls = function () {
  let poll = Meteor.Polls.findOne({})
  if (!poll) {
    return { pollExists: false };
  }

  const pollExists = poll.poll_info.poll.requester != getInSession('userId')
  return {
    poll: {
      answers: poll.poll_info.poll.answers,
      num_respondents: poll.poll_info.poll.num_respondents,
      num_responders: poll.poll_info.poll.num_responders,
      requester: poll.poll_info.poll.requester
    },
    pollExists: pollExists,
  };
}

export default {mapPolls};
