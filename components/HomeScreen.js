// HomeScreen
// The fake phone home screen showing 5 app icons:
// Instagram, WhatsApp, X (Twitter), TikTok, and Legitimate Checker.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppIcon from './AppIcon';
import { appLogos } from '../data/dummyContent';

export default function HomeScreen({ onOpenApp, checkerActive }) {
  return (
    <View style={styles.container}>
      {/* Top status bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
        <Text style={styles.statusText}>5G  🔋</Text>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Good day</Text>
        <Text style={styles.greetingSub}>
          {checkerActive
            ? 'Checker is active — bubble will appear inside apps.'
            : 'Open Legitimate Checker to begin.'}
        </Text>
      </View>

      {/* App grid */}
      <View style={styles.grid}>
        <AppIcon
          label="Instagram"
          color="#fff"
          iconUri={appLogos.instagram}
          onPress={() => onOpenApp('instagram')}
        />
        <AppIcon
          label="WhatsApp"
          color="#fff"
          iconUri={appLogos.whatsapp}
          onPress={() => onOpenApp('whatsapp')}
        />
        <AppIcon
          label="X"
          color="#000"
          iconUri={appLogos.twitter}
          onPress={() => onOpenApp('twitter')}
        />
        <AppIcon
          label="TikTok"
          color="#fff"
          iconUri={appLogos.tiktok}
          onPress={() => onOpenApp('tiktok')}
        />
        <AppIcon
          label="Checker"
          color="#2563EB"
          isLogo
          onPress={() => onOpenApp('checker')}
        />
      </View>

      {/* Dock */}
      <View style={styles.dock}>
        <Text style={styles.dockHint}>Tap an app to open</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Soft purple/blue gradient look using a flat color (Expo without extra deps).
    backgroundColor: '#3B5BA5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  greeting: {
    marginTop: 30,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  greetingTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  greetingSub: {
    color: '#E0E7FF',
    fontSize: 13,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  dock: {
    marginTop: 'auto',
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
  },
  dockHint: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});
