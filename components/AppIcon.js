// AppIcon
// One app icon on the fake home screen — colored square + label.

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function AppIcon({ label, emoji, color, onPress, isLogo }) {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        {isLogo ? (
          <Text style={styles.logoText}>LC</Text>
        ) : (
          <Text style={styles.emoji}>{emoji}</Text>
        )}
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 22,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Soft shadow to make icons feel app-like.
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  emoji: {
    fontSize: 30,
  },
  logoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 1,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 2,
  },
});
