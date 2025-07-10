// /app/screens/UserSelectionScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const UserSelectionScreen = ({ onSelect }: { onSelect: (userId: string) => void }) => {
  return (
    <View style={styles.container}>
      <Button title="Login as User A" onPress={() => onSelect('userA')} />
      <Button title="Login as User B" onPress={() => onSelect('userB')} />
    </View>
  );
};

export default UserSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
