import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useBalanceStore } from '../store/useBalanceStore';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const { balance } = useBalanceStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Email: {user?.email || '-'}</Text>
      <Text>Balance: {balance}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default ProfileScreen;
