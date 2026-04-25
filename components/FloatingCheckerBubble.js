// FloatingCheckerBubble
// Small circular button that floats at the bottom-right of the screen.
// Only shown after the user activates the Checker.
// Tapping it opens the Checker modal.

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function FloatingCheckerBubble({
  onPress,
  bottomOffset = 28,
}) {
  return (
    <View
      style={[styles.wrapper, { bottom: bottomOffset }]}
      pointerEvents="box-none"
    >
      <Pressable style={styles.bubble} onPress={onPress}>
        {/* Inner ring + LC label */}
        <View style={styles.inner}>
          <Text style={styles.label}>LC</Text>
        </View>
        {/* Tiny shield icon */}
        <Text style={styles.shield}>🛡️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // Sit on top of every screen.
    position: 'absolute',
    right: 16,
    zIndex: 100,
  },
  bubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  shield: {
    position: 'absolute',
    top: -4,
    right: -4,
    fontSize: 14,
  },
});
