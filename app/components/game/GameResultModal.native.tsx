import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface GameResultModalProps {
  isOpen: boolean
  winAmount: number
  winningFruit: string
  isWin: boolean
  onClose: () => void
  onPlayAgain: () => void
}

const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  winAmount,
  winningFruit,
  isWin,
  onClose,
  onPlayAgain,
}) => {
  const resultMessage = isWin
    ? winAmount >= 50000
      ? '🎊 MEGA WIN! 🎊'
      : winAmount >= 10000
      ? '🌟 BIG WIN! 🌟'
      : winAmount >= 1000
      ? '🎉 NICE WIN! 🎉'
      : '💰 YOU WIN! 💰'
    : '😔 Better luck next time! 😔'

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Game Result</Text>

          <Text style={[styles.message, isWin ? styles.win : styles.lose]}>{resultMessage}</Text>

          <View style={[styles.circle, isWin ? styles.winCircle : styles.loseCircle]}>
            <Text style={styles.emoji}>{winningFruit}</Text>
          </View>

          {isWin ? (
            <View style={styles.center}>
              <Text style={styles.subtle}>Congratulations!</Text>
              <Text style={styles.winAmount}>+${winAmount.toLocaleString()}</Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.subtle}>No win this time</Text>
              <Text style={styles.loseAmount}>${winAmount.toLocaleString()}</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity onPress={onPlayAgain} style={[styles.button, styles.playBtn]}>
              <Text style={styles.buttonText}>🎰 Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.closeBtn]}>
              <Text style={styles.buttonText}>📊 View Stats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  card: { width: '80%', backgroundColor: '#0b1020', borderWidth: 2, borderColor: '#facc15', borderRadius: 12, padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  message: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  win: { color: '#86efac' },
  lose: { color: '#fca5a5' },
  circle: { width: 96, height: 96, borderRadius: 48, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  winCircle: { backgroundColor: '#facc15' },
  loseCircle: { backgroundColor: '#4b5563' },
  emoji: { fontSize: 40 },
  center: { alignItems: 'center', gap: 6, marginBottom: 8 },
  subtle: { color: '#c7d2fe' },
  winAmount: { color: '#34d399', fontWeight: 'bold', fontSize: 28 },
  loseAmount: { color: '#f87171', fontWeight: 'bold', fontSize: 22 },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 8 },
  button: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  playBtn: { backgroundColor: '#22c55e' },
  closeBtn: { backgroundColor: '#4b5563' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
})

export default GameResultModal