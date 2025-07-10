import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ProfileAvatar({ source }: { source: string }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: source }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
});
