// LockScreen
// Fake phone lock screen with current time, date, and a "Swipe up to unlock" button.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { checkerIcons } from '../data/dummyContent';

export default function LockScreen({ onUnlock }) {
  // Update the time every minute so the lock screen feels alive.
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = now.toLocaleDateString([], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.container}>
      {/* Top status placeholder */}
      <View style={styles.topBar}>
        <Text style={styles.statusText}>5G</Text>
        <Text style={styles.statusText}>🔋 87%</Text>
      </View>

      {/* Big clock */}
      <View style={styles.clockArea}>
        <Text style={styles.date}>{dateString}</Text>
        <Text style={styles.time}>{timeString}</Text>
      </View>

      {/* Notification card */}
      <View style={styles.notificationCard}>
        <View style={styles.notifTitleRow}>
          <Image source={{ uri: checkerIcons.bell }} style={styles.notifIcon} />
          <Text style={styles.notifTitle}>Legitimate Checker</Text>
        </View>
        <Text style={styles.notifBody}>
          Pause. Check. Think before sharing.
        </Text>
      </View>

      {/* Swipe-up button (just a tap in this prototype) */}
      <Pressable style={styles.unlockButton} onPress={onUnlock}>
        <Text style={styles.unlockArrow}>⌃</Text>
        <Text style={styles.unlockText}>Swipe up to unlock</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  clockArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: '#E5E7EB',
    fontSize: 16,
    marginBottom: 8,
  },
  time: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '200',
    letterSpacing: -2,
  },
  notificationCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 30,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  notifTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  notifBody: {
    color: '#E5E7EB',
    fontSize: 13,
  },
  unlockButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  unlockArrow: {
    color: '#fff',
    fontSize: 28,
    opacity: 0.8,
  },
  unlockText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
    marginTop: 4,
  },
});
