import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import VideoCall from '../components/VideoCall';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <VideoCall />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
