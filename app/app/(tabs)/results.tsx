import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameButton } from '../../components/GameButton';
import { FRUITS } from '../../constants/GameConstants';

const mockResults = [
  { fruit: 'Cherry', multiplier: 5, time: '2 min ago', won: true, amount: 500 },
  { fruit: 'Banana', multiplier: 3, time: '5 min ago', won: false, amount: 0 },
  { fruit: 'Grape', multiplier: 8, time: '8 min ago', won: true, amount: 800 },
  { fruit: 'Watermelon', multiplier: 12, time: '12 min ago', won: false, amount: 0 },
  { fruit: 'Orange', multiplier: 6, time: '15 min ago', won: true, amount: 600 },
];

export default function ResultsScreen() {
  const lastWin = mockResults.find(r => r.won);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🏆 Results & History</Text>
        </View>

        {/* Last Win Celebration */}
        {lastWin && (
          <View style={styles.celebrationContainer}>
            <Text style={styles.celebrationTitle}>🎉 Last Win!</Text>
            <View style={styles.winDisplay}>
              <Text style={styles.winFruit}>
                {FRUITS.find(f => f.name === lastWin.fruit)?.emoji}
              </Text>
              <Text style={styles.winAmount}>+${lastWin.amount}</Text>
              <Text style={styles.winMultiplier}>x{lastWin.multiplier}</Text>
            </View>
          </View>
        )}

        {/* Results History */}
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Results</Text>
          {mockResults.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <View style={styles.resultLeft}>
                <Text style={styles.resultFruit}>
                  {FRUITS.find(f => f.name === result.fruit)?.emoji}
                </Text>
                <View>
                  <Text style={styles.resultName}>{result.fruit}</Text>
                  <Text style={styles.resultTime}>{result.time}</Text>
                </View>
              </View>
              <View style={styles.resultRight}>
                <Text style={styles.resultMultiplier}>x{result.multiplier}</Text>
                <Text style={[
                  styles.resultAmount,
                  result.won ? styles.winAmountText : styles.lossAmount
                ]}>
                  {result.won ? `+$${result.amount}` : '-$100'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <GameButton
            title="🎰 Play Again"
            onPress={() => {}}
            variant="success"
            size="large"
          />
          <GameButton
            title="📊 Statistics"
            onPress={() => {}}
            variant="secondary"
            size="medium"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  celebrationContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  celebrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 10,
  },
  winDisplay: {
    alignItems: 'center',
  },
  winFruit: {
    fontSize: 40,
    marginBottom: 10,
  },
  winAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B894',
  },
  winMultiplier: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  historyContainer: {
    flex: 1,
    marginVertical: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  resultFruit: {
    fontSize: 24,
  },
  resultName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultTime: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.7,
  },
  resultRight: {
    alignItems: 'flex-end',
  },
  resultMultiplier: {
    color: '#F39C12',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  winAmountText: {
    color: '#00B894',
  },
  lossAmount: {
    color: '#E17055',
  },
  actionButtons: {
    gap: 15,
    paddingBottom: 20,
  },
});