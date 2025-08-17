import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ExactTopHUDProps {
  balance: number
}

const ExactTopHUD: React.FC<ExactTopHUDProps> = ({ balance }) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>💠</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>{balance.toLocaleString()}</Text>
        </View>
      </View>

      {/* Right Section - 4 Circular Icons */}
      <View style={styles.rightSection}>
        <View style={styles.iconButton}><Text style={styles.coinIcon}>⓪</Text></View>
        <View style={styles.iconButton}><Text style={styles.iconText}>🏆</Text></View>
        <View style={styles.iconButton}><Text style={styles.iconText}>🕐</Text></View>
        <View style={styles.iconButton}><Text style={styles.iconText}>🔊</Text></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#0b2230',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f3644',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontWeight: 'bold' },
  balanceBox: {
    backgroundColor: 'rgba(23,32,42,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  balanceText: { color: '#fff', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#162935',
    borderWidth: 1,
    borderColor: 'rgba(23,32,42,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIcon: { color: '#ffd700', fontSize: 16 },
  iconText: { color: '#fff', fontSize: 16 },
})

export default ExactTopHUD