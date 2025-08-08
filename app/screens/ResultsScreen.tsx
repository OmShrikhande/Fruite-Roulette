import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsScreen = () => {
  // TODO: Fetch and display game history
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results & History</Text>
      <Text>Game history will be shown here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default ResultsScreen;
