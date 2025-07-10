// /app/services/callService.ts
import { collection, addDoc, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function requestCall(callerId: string, receiverId: string, channelName: string) {
  await addDoc(collection(db, 'calls'), {
    callerId,
    receiverId,
    status: 'RINGING',
    channelName
  });
}

export function listenIncomingCalls(receiverId: string, callback: (call: any) => void) {
  const q = query(collection(db, 'calls'),
    where('receiverId', '==', receiverId),
    where('status', '==', 'RINGING')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      callback({ id: doc.id, ...doc.data() });
    });
  });

  return unsubscribe;
}

export async function updateCallStatus(callId: string, status: string) {
  const callRef = doc(db, 'calls', callId);
  await updateDoc(callRef, { status });
}
