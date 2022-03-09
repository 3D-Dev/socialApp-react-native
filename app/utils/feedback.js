export const removeDuplicates = ar => {
  return ar.filter((item, pos) => {
    return ar.indexOf(item) === pos;
  });
};

export const calculateRequest = (feedbacks, myuserID) => {
  let groupdIds = [];
  const allRequested = feedbacks
    .filter(item => item.sender.user_id === myuserID && item.pending)
    .map(f => {
      const newItem = {
        user_id: f.receiver.user_id,
        name: f.receiver.name,
        avatar: f.receiver.avatar,
        groupId: f.groupId,
        question: f.question
      };
      groupdIds.push(f.groupId);
      return newItem;
    });
  groupdIds = removeDuplicates(groupdIds);

  const requested = [];
  groupdIds.forEach(id => {
    const reqsByGroups = allRequested.filter(item => item.groupId === id);
    let userIds = reqsByGroups.map(item => item.user_id);
    userIds = removeDuplicates(userIds);
    userIds.forEach(id => {
      const subreqs = reqsByGroups.filter(item => item.user_id === id);
      if (subreqs.length > 0) {
        requested.push(subreqs);
      }
    });
  });

  return requested;
};

export const calculateReceived = (feedbacks, myuserID) => {
  const received = feedbacks
    .filter(item => item.sender.user_id === myuserID)
    .map(f => {
      const newItem = {
        name: f.receiver.name,
        avatar: f.receiver.avatar,
        question: f.question,
        feedback: f.feedback
      };
      return newItem;
    });
  return received.filter(item => item.feedback !== '');
};

export const calculatePending = (feedbacks, myuserID) => {
  const pending = feedbacks
    .filter(item => item.receiver.user_id === myuserID && item.pending)
    .map(f => {
      const newItem = {
        feedback_id: f.feedback_id,
        user: f.sender,
        question: f.question,
        feedback: f.feedback,
        groupId: f.groupId
      };

      return newItem;
    });

  return pending;
};

export const calculateSent = (feedbacks, myuserID) => {
  const sent = feedbacks
    .filter(item => item.receiver.user_id === myuserID && !item.pending)
    .map(f => {
      const newItem = {
        user: f.sender,
        question: f.question,
        feedback: f.feedback
      };
      return newItem;
    });

  return sent;
};

export const convertPropFeedbacksToState = (feedbacks, profileData) => {
  if (feedbacks && feedbacks.feedbacks && feedbacks.feedbacks.length > 0) {
    const myuserId = profileData._id;
    const feedbacksNameReplaced = feedbacks.feedbacks.map(item => {
      const { receiver, sender } = item;
      const newItem = {
        feedback_id: item._id,
        feedback: item.feedback,
        groupId: item.groupId,
        pending: item.pending,
        question: item.question,
        receiver: {
          user_id: receiver._id,
          name: receiver.name,
          avatar: receiver.avatar
        },
        sender: {
          user_id: sender._id,
          name: sender.name,
          avatar: sender.avatar
        }
      };
      return newItem;
    });

    const stateFeedbacks = {
      sent: calculateSent(feedbacksNameReplaced, myuserId),
      requested: calculateRequest(feedbacksNameReplaced, myuserId),
      pending: calculatePending(feedbacksNameReplaced, myuserId),
      received: calculateReceived(feedbacksNameReplaced, myuserId)
    };
    return stateFeedbacks;
  }
  return {};
};
