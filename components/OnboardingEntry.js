// OnboardingEntry
// First screen shown when the Checker app is opened for the first time
// (proposal §5.2.1–§5.2.3). Lets the user pick how they arrived so we can
// route them through the right onboarding flow:
//
//   - "Seorang anggota keluarga membantu saya menyiapkan" → State A
//     (existing CheckerApp flow with family/self toggle).
//   - "Saya sendiri" → State B (SoloOnboarding).
//
// Below those two primary paths, three community entry cards are listed:
// QR di papan masjid/RT, tautan WhatsApp komunitas, dan halaman literasi
// Kemenkomdigi. These are visual-only — tapping any of them routes to
// State B, which is the intended path for community-referred users.

import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { checkerIcons } from '../data/dummyContent';

export default function OnboardingEntry({
  onPickAssisted,
  onPickSolo,
  onBackHome,
}) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* Top bar */}
      <View style={styles.header}>
        <Pressable onPress={onBackHome}>
          <Text style={styles.cancelText}>← Beranda</Text>
        </Pressable>
      </View>

      {/* Logo + title */}
      <View style={styles.logoArea}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>LC</Text>
        </View>
        <Text style={styles.title}>Legitimate Checker</Text>
        <Text style={styles.subtitle}>Berhenti. Periksa. Pikir dulu sebelum membagikan.</Text>
      </View>

      <Text style={styles.sectionLabel}>Pertama kali menggunakan?</Text>

      {/* Primary entry: assisted */}
      <Pressable style={styles.primaryCard} onPress={onPickAssisted}>
        <Image source={{ uri: checkerIcons.family }} style={styles.primaryIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.primaryTitle}>
            Seorang anggota keluarga membantu saya menyiapkan
          </Text>
        </View>
      </Pressable>

      {/* Primary entry: solo */}
      <Pressable style={styles.primaryCard} onPress={onPickSolo}>
        <Image source={{ uri: checkerIcons.self }} style={styles.primaryIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.primaryTitle}>Saya sendiri</Text>
        </View>
      </Pressable>

      {/* Community entry section */}
      <Text style={[styles.sectionLabel, { marginTop: 18 }]}>
        Saya tiba di sini melalui...
      </Text>

      <CommunityCard
        title="QR code di papan masjid atau RT"
        emoji="🟦"
        onPress={onPickSolo}
      />
      <CommunityCard
        title="Tautan WhatsApp dari grup komunitas"
        emoji="🟩"
        onPress={onPickSolo}
      />
      <CommunityCard
        title="Halaman literasi digital Kementerian Komunikasi dan Digital"
        emoji="🟧"
        onPress={onPickSolo}
      />
    </ScrollView>
  );
}

function CommunityCard({ title, emoji, onPress }) {
  return (
    <Pressable style={styles.communityCard} onPress={onPress}>
      <Text style={styles.communityEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.communityTitle}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  cancelText: { color: '#2563EB', fontSize: 15, fontWeight: '500' },
  logoArea: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 12,
    marginTop: 2,
  },
  sectionLabel: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  primaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  primaryIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
    tintColor: '#2563EB',
  },
  primaryTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  communityEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  communityTitle: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
});

// Grounding note (proposal §5.2.1–§5.2.3): the entry chooser makes the
// assisted vs solo split visible at the very first screen, and surfaces the
// community-referral channels (mosque/RT QR, community WhatsApp,
// Kemenkomdigi page) without inventing functional behaviour for them.
