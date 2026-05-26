// HomeScreen
// The fake phone home screen showing 5 app icons:
// Instagram, WhatsApp, X (Twitter), TikTok, and Legitimate Checker.
//
// Also hosts the language toggle pill (top-right of the status bar). The
// toggle flips between Bahasa Indonesia (default) and English (for tutors
// and reviewers who don't read Indonesian). Every other screen reads the
// current language via the LanguageContext provided by App.js.

import { View, Text, StyleSheet, Pressable } from 'react-native';
import AppIcon from './AppIcon';
import { appLogos } from '../data/dummyContent';
import { useT } from '../LanguageContext';

export default function HomeScreen({
  onOpenApp,
  checkerActive,
  language,
  onToggleLanguage,
}) {
  const t = useT();
  // Show the *target* language on the chip, like iOS keyboard switcher.
  const nextLangLabel = language === 'id' ? 'EN' : 'ID';

  return (
    <View style={styles.container}>
      {/* Top status bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>

        <View style={styles.statusRight}>
          {/* Language toggle */}
          <Pressable style={styles.langPill} onPress={onToggleLanguage}>
            <Text style={styles.langPillIcon}>🌐</Text>
            <Text style={styles.langPillText}>{nextLangLabel}</Text>
          </Pressable>
          <Text style={styles.statusText}>5G  🔋</Text>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>{t('home.greeting')}</Text>
        <Text style={styles.greetingSub}>
          {checkerActive
            ? t('home.checkerActiveHint')
            : t('home.openCheckerHint')}
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

      {/* Hint dock */}
      <View style={styles.dock}>
        <Text style={styles.dockHint}>{t('home.dockHint')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B5BA5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 12,
    gap: 5,
  },
  langPillIcon: {
    fontSize: 12,
  },
  langPillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    // Keep this above the Samsung footer.
    marginBottom: 86,
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
