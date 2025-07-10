// types.ts (or inside AppNavigator.tsx if small app)
export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Contacts: undefined;
  IncomingCall: { call: any };
  OutgoingCall: { channelName: string };
  VideoCall: { channelName: string };
};
