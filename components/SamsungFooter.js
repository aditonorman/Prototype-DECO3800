// SamsungFooter
// Android-style bottom navigation bar:
// Recents, Home, Back.

import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';

export const SAMSUNG_FOOTER_HEIGHT = 56;

function RecentsIcon() {
  return (
    <View style={styles.recentsIcon}>
      <View style={styles.recentsBar} />
      <View style={styles.recentsBar} />
      <View style={styles.recentsBar} />
    </View>
  );
}

function HomeIcon() {
  return <View style={styles.homeIcon} />;
}

function BackIcon() {
  return <Text style={styles.backIcon}>‹</Text>;
}

export default function SamsungFooter({ onRecents, onHome, onBack }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onRecents} style={styles.button}>
        <RecentsIcon />
      </Pressable>

      <Pressable onPress={onHome} style={styles.button}>
        <HomeIcon />
      </Pressable>

      <Pressable onPress={onBack} style={styles.button}>
        <BackIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SAMSUNG_FOOTER_HEIGHT,
    backgroundColor: '#07090C',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  button: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentsBar: {
    width: 2,
    height: 14,
    borderRadius: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 1.5,
  },
  homeIcon: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: '#F3F4F6',
  },
  backIcon: {
    color: '#F3F4F6',
    fontSize: 25,
    fontWeight: '500',
    marginTop: -3,
    marginLeft: 2,
  },
});
