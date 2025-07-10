// You can expand this later for RTM (signaling)
export const sendCallInvite = (userId: string, channel: string) => {
  console.log(`Sending call invite to ${userId} for channel ${channel}`);
};

export const acceptCallInvite = (channel: string) => {
  console.log(`Accepted call, joining channel ${channel}`);
};
