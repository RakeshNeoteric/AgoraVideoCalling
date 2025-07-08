import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import UserSelectionScreen from '../screens/UserSelectionScreen';



export default function App() {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {userId ? (
        <HomeScreen userId={userId} />
      ) : (
        <UserSelectionScreen onSelect={setUserId} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
