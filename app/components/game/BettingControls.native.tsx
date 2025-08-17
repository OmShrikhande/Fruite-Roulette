import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface BettingControlsProps {
  gamePhase: 'betting' | 'spinning' | 'result'
  selectedChip: number
  balance: number
  totalBets: number
  onChipSelect: (value: number) => void
  onFruitBet: (fruit: string) => void
  onSpin: () => void
  onNewGame: () => void
}

const fruits = ['🍊', '🍎', '🍇', '🍌', '🥝']
const chips = [10, 100, 1000, 5000, 50000]

const BettingControls: React.FC<BettingControlsProps> = ({
  gamePhase,
  selectedChip,
  balance,
  totalBets,
  onChipSelect,
  onFruitBet,
  onSpin,
  onNewGame,
}) => {
  const phaseText =
    gamePhase === 'betting' ? 'PLACE BETS' : gamePhase === 'spinning' ? 'SPINNING…' : 'GAME OVER'

  return (
    <View style={styles.container}>
      {/* Status Row */}
      <View style={styles.statusRow}>
        <View style={[styles.pill, gamePhase === 'betting' ? styles.pillGreen : gamePhase === 'spinning' ? styles.pillYellow : styles.pillBlue]}>
          <Text style={styles.pillText}>{phaseText}</Text>
        </View>
        <Text style={styles.statusText}>Balance: <Text style={styles.green}>${balance.toLocaleString()}</Text></Text>
        <Text style={styles.statusText}>Total Bets: <Text style={styles.gold}>${totalBets.toLocaleString()}</Text></Text>
      </View>

      {/* Fruit Row */}
      <View style={styles.fruitRow}>
        <Text style={styles.label}>Bet on:</Text>
        <View style={styles.fruitButtons}>
          {fruits.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => onFruitBet(f)}
              disabled={gamePhase !== 'betting' || selectedChip > balance}
              style={[styles.fruitBtn, (gamePhase !== 'betting' || selectedChip > balance) && styles.disabled]}
              activeOpacity={0.8}
            >
              <Text style={styles.fruitEmoji}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Controls Row */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={gamePhase === 'result' ? onNewGame : onSpin}
          disabled={gamePhase === 'spinning'}
          style={[styles.actionBtn, gamePhase === 'spinning' && styles.disabled]}
          activeOpacity={0.8}
        >
          <Text style={styles.actionIcon}>{gamePhase === 'result' ? '🔄' : gamePhase === 'spinning' ? '⏳' : '🎰'}</Text>
        </TouchableOpacity>

        <View style={styles.chipsRow}>
          {chips.map((v) => (
            <TouchableOpacity
              key={v}
              onPress={() => onChipSelect(v)}
              disabled={gamePhase !== 'betting'}
              style={[styles.chip, selectedChip === v && styles.chipSelected, gamePhase !== 'betting' && styles.disabled]}
              activeOpacity={0.8}
            >
              <Text style={styles.chipText}>{v >= 1000 ? `${v / 1000}K` : v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickCol}>
          <TouchableOpacity
            onPress={() => onChipSelect(Math.min(balance, 1000))}
            disabled={gamePhase !== 'betting' || balance < 10}
            style={[styles.quickBtn, (gamePhase !== 'betting' || balance < 10) && styles.disabled]}
          >
            <Text style={styles.quickText}>MAX</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChipSelect(10)}
            disabled={gamePhase !== 'betting' || balance < 10}
            style={[styles.quickBtn, (gamePhase !== 'betting' || balance < 10) && styles.disabled]}
          >
            <Text style={styles.quickText}>MIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {balance < selectedChip && gamePhase === 'betting' && (
        <View style={styles.warnBox}>
          <Text style={styles.warnText}>Insufficient balance for selected chip value</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#0f1f2a', padding: 12, borderTopWidth: 1, borderTopColor: '#1f2f3a' },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  pillGreen: { backgroundColor: '#16a34a' },
  pillYellow: { backgroundColor: '#ca8a04' },
  pillBlue: { backgroundColor: '#2563eb' },
  pillText: { color: '#fff', fontWeight: 'bold' },
  statusText: { color: '#fff' },
  green: { color: '#22c55e', fontFamily: 'monospace', fontWeight: 'bold' },
  gold: { color: '#fbbf24', fontFamily: 'monospace', fontWeight: 'bold' },
  fruitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { color: '#fff', marginRight: 8, fontWeight: 'bold' },
  fruitButtons: { flexDirection: 'row', gap: 8 },
  fruitBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  fruitEmoji: { fontSize: 22 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2563eb' },
  actionIcon: { color: '#fff', fontSize: 22 },
  chipsRow: { flexDirection: 'row', gap: 8, flex: 1, justifyContent: 'center' },
  chip: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#374151', borderWidth: 1, borderColor: '#9ca3af' },
  chipSelected: { borderColor: '#60a5fa', shadowColor: '#60a5fa', shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  chipText: { color: '#fff', fontWeight: 'bold' },
  quickCol: { gap: 8 },
  quickBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#f59e0b', borderRadius: 8 },
  quickText: { color: '#fff', fontWeight: 'bold' },
  disabled: { opacity: 0.5 },
  warnBox: { marginTop: 8, padding: 8, backgroundColor: 'rgba(220,38,38,0.2)', borderWidth: 1, borderColor: 'rgba(220,38,38,0.4)', borderRadius: 8 },
  warnText: { color: '#fca5a5', textAlign: 'center' },
})

export default BettingControls