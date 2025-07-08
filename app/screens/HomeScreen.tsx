import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Modal } from 'react-native';
import { requestCall, listenIncomingCalls, updateCallStatus } from '../services/callService';
import VideoCall from '../components/VideoCall';

const HomeScreen = ({ userId }: { userId: string }) => {
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [inCall, setInCall] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('');

  useEffect(() => {
    const unsubscribe = listenIncomingCalls(userId, (call) => {
      setIncomingCall(call);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleAccept = async () => {
    if (incomingCall) {
       console.log('Accepting call with channel:', incomingCall.channelName);
      await updateCallStatus(incomingCall.id, 'IN_CALL');
      setCurrentChannel(incomingCall.channelName);
      setInCall(true);
      setIncomingCall(null);
    }
  };

  const handleReject = async () => {
    if (incomingCall) {
      await updateCallStatus(incomingCall.id, 'REJECTED');
      setIncomingCall(null);
    }
  };

  const handleStartCall = async () => {
    const channel = `channel-${Date.now()}`;
     console.log('Starting Call with channel:', channel);
    await requestCall(userId, 'userB', channel);  // 👈 Adjust this as needed
    setCurrentChannel(channel);
    setInCall(true);
  };

  return (
    <View style={styles.container}>
      {!inCall ? (
        <>
          <Button title="Start Video Call to userB" onPress={handleStartCall} />
          <Modal visible={!!incomingCall} transparent>
            <View style={styles.modal}>
              <Text>Incoming Call from {incomingCall?.callerId}</Text>
              <Button title="Accept" onPress={handleAccept} />
              <Button title="Reject" onPress={handleReject} />
            </View>
          </Modal>
        </>
      ) : (
        <VideoCall
          channelName={currentChannel}
          onEnd={() => {
            setInCall(false);
            setCurrentChannel('');
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }
});
