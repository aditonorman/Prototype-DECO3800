// PhoneFrame
// Wraps the whole app in a fake phone body so the prototype looks like a real phone screen.
// On small devices it just fills the screen; on bigger devices it shows a black "phone" border.

import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

export default function PhoneFrame({ children }) {
  const { width, height } = Dimensions.get('window');

  // If the screen is narrow (real phone), don't draw an extra frame — just fill the screen.
  const isLikelyRealPhone = width < 500;

  if (isLikelyRealPhone) {
    return <View style={styles.fullScreen}>{children}</View>;
  }

  // On wider screens (tablet / desktop preview), draw a phone-shaped frame.
  return (
    <View style={styles.outer}>
      <View style={styles.frame}>
        <View style={styles.notch} />
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  outer: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  frame: {
    width: 380,
    height: 780,
    backgroundColor: '#000',
    borderRadius: 48,
    padding: 10,
    borderWidth: 4,
    borderColor: '#1F2937',
    overflow: 'hidden',
    // Soft shadow around the phone
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  notch: {
    position: 'absolute',
    top: 14,
    left: '50%',
    marginLeft: -55,
    width: 110,
    height: 26,
    backgroundColor: '#000',
    borderRadius: 14,
    zIndex: 50,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 36,
    overflow: 'hidden',
  },
});
