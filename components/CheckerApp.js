// CheckerApp
// The Legitimate Checker app screen.
// Three "sub-views":
//   1. Intro + agreement checkboxes + Activate button
//   2. Success screen after activation
//   3. Small settings list (always shown if checker already active)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { checkerIcons } from '../data/dummyContent';

// A small checkbox row component used in the agreement card.
function CheckRow({ label, checked, onToggle }) {
  return (
    <Pressable style={styles.checkRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <Image
            source={{ uri: checkerIcons.check }}
            style={styles.checkmarkIcon}
          />
        )}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

export default function CheckerApp({
  onActivate,
  onBackHome,
  checkerActive,
}) {
  // Three agreement boxes — all three must be ticked to activate.
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  // After tapping Activate we briefly show a confirmation view inside the app.
  const [justActivated, setJustActivated] = useState(false);

  // Finding 7 — household inoculation. Picking "for a family member" turns on
  // the simpler defaults so a younger user can configure for an older relative.
  const [setupFor, setSetupFor] = useState('self'); // 'self' | 'family'

  // Finding 4 — plain-language algorithm explainer is hidden behind a tap
  // so it does not crowd the page, but is offered to anyone who wants it.
  const [showAlgoExplainer, setShowAlgoExplainer] = useState(false);

  // Settings — these are visual only, they don't change behaviour.
  // Defaults shift if the user is setting up for a family member.
  const isFamilyMode = setupFor === 'family';
  const [simpleLanguage, setSimpleLanguage] = useState(true);
  const [showSourceReminders, setShowSourceReminders] = useState(true);
  const [oneTapDismiss, setOneTapDismiss] = useState(false);

  // When the user switches to family mode, nudge the toggles to friendly defaults.
  // We set them once on every change rather than mirroring state, to keep this simple.
  function handleSetupForChange(value) {
    setSetupFor(value);
    if (value === 'family') {
      setSimpleLanguage(true);
      setShowSourceReminders(true);
      setOneTapDismiss(true);
    }
  }

  const allAgreed = agree1 && agree2 && agree3;

  // Handle the Activate button.
  function handleActivate() {
    onActivate();
    setJustActivated(true);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header bar with back button */}
      <View style={styles.header}>
        <Pressable onPress={onBackHome} style={styles.backBtn}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>
      </View>

      {/* Logo + title */}
      <View style={styles.logoArea}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>LC</Text>
        </View>
        <Text style={styles.title}>Legitimate Checker</Text>
        <Text style={styles.subtitle}>Pause. Check. Think before sharing.</Text>
      </View>

      {/* If user just activated OR already active, show success view */}
      {(justActivated || checkerActive) && !justActivated && (
        <View style={styles.activeBanner}>
          <View style={styles.statusRow}>
            <Image source={{ uri: checkerIcons.active }} style={styles.statusIcon} />
            <Text style={styles.activeBannerTitle}>Checker is active</Text>
          </View>
          <Text style={styles.activeBannerBody}>
            A small floating bubble will appear while you browse Instagram,
            WhatsApp, X, and TikTok.
          </Text>
        </View>
      )}

      {justActivated ? (
        // Big success screen shown right after the user activates the checker.
        <View style={styles.successCard}>
          <View style={styles.statusRow}>
            <Image source={{ uri: checkerIcons.active }} style={styles.statusIcon} />
            <Text style={styles.successTitle}>Checker is active</Text>
          </View>
          <Text style={styles.successBody}>
            A small floating bubble will now appear while you browse.
          </Text>
          <Text style={styles.onboardNote}>
            Checker activated. You can now use the floating bubble to pause and
            check suspicious content.
          </Text>
          <Pressable style={styles.primaryBtn} onPress={onBackHome}>
            <Text style={styles.primaryBtnText}>Back to Home</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Purpose card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What this tool does</Text>
            <Text style={styles.cardBody}>
              This tool does not decide the truth for you. It helps you check
              sources, notice warning signs, and think carefully before
              trusting or sharing online information.
            </Text>
          </View>

          {/* Plain-language "why am I seeing this?" — Finding 4.
              Hidden behind a tap so it doesn't crowd the page. */}
          <View style={styles.card}>
            <Pressable
              style={styles.expandHeader}
              onPress={() => setShowAlgoExplainer(!showAlgoExplainer)}
            >
              <Text style={[styles.cardTitle, styles.expandTitle]}>
                Why am I seeing this on my feed?
              </Text>
              <Image
                source={{
                  uri: showAlgoExplainer
                    ? checkerIcons.collapse
                    : checkerIcons.expand,
                }}
                style={styles.expandIcon}
              />
            </Pressable>
            {showAlgoExplainer && (
              <Text style={styles.cardBody}>
                Apps like Instagram, TikTok, and X try to guess what you like.
                They watch what you stop and look at, what you tap, and what
                you share. Then they show you more posts that look similar.
                {'\n\n'}
                This is sometimes called an “algorithm.” It is just a sorting
                rule the app uses. It is not the news, and it is not your
                friend deciding for you. If you keep seeing the same kind of
                story, it may be the algorithm — not the world — repeating it.
              </Text>
            )}
          </View>

          {/* Household setup toggle — Finding 7.
              Younger users often install reflective tools for older relatives. */}
          {!checkerActive && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Who is this for?</Text>
              <Text style={styles.cardBody}>
                Choose who will use the Checker. We will set kinder defaults
                if it is for someone in your family.
              </Text>
              <View style={styles.setupRow}>
                <Pressable
                  onPress={() => handleSetupForChange('self')}
                  style={[
                    styles.setupChip,
                    !isFamilyMode && styles.setupChipActive,
                  ]}
                >
                  <View style={styles.setupChipContent}>
                    <Image
                      source={{ uri: checkerIcons.self }}
                      style={[
                        styles.setupChipIcon,
                        !isFamilyMode && styles.setupChipIconActive,
                      ]}
                    />
                    <Text
                      style={[
                        styles.setupChipText,
                        !isFamilyMode && styles.setupChipTextActive,
                      ]}
                    >
                      Just me
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => handleSetupForChange('family')}
                  style={[
                    styles.setupChip,
                    isFamilyMode && styles.setupChipActive,
                  ]}
                >
                  <View style={styles.setupChipContent}>
                    <Image
                      source={{ uri: checkerIcons.family }}
                      style={[
                        styles.setupChipIcon,
                        isFamilyMode && styles.setupChipIconActive,
                      ]}
                    />
                    <Text
                      style={[
                        styles.setupChipText,
                        isFamilyMode && styles.setupChipTextActive,
                      ]}
                    >
                      For a family member
                    </Text>
                  </View>
                </Pressable>
              </View>
              {isFamilyMode && (
                <Text style={styles.familyNote}>
                  Family mode turns on Simple language and One-tap dismiss.
                  You can still adjust them in Settings below.
                </Text>
              )}
            </View>
          )}

          {/* Agreement card — only shown if not already active */}
          {!checkerActive && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Before you start</Text>
              <CheckRow
                label="I understand this tool is only a guide."
                checked={agree1}
                onToggle={() => setAgree1(!agree1)}
              />
              <CheckRow
                label="I understand the final decision is still mine."
                checked={agree2}
                onToggle={() => setAgree2(!agree2)}
              />
              <CheckRow
                label="I agree to use this tool to support digital literacy."
                checked={agree3}
                onToggle={() => setAgree3(!agree3)}
              />

              <Pressable
                style={[
                  styles.primaryBtn,
                  !allAgreed && styles.primaryBtnDisabled,
                ]}
                disabled={!allAgreed}
                onPress={handleActivate}
              >
                <Text style={styles.primaryBtnText}>Activate Checker</Text>
              </Pressable>
            </View>
          )}
        </>
      )}

      {/* Settings — always available */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Settings</Text>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Simple language mode</Text>
            <Text style={styles.settingHint}>Use plain, easy-to-read words.</Text>
          </View>
          <Switch value={simpleLanguage} onValueChange={setSimpleLanguage} />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Show source reminders</Text>
            <Text style={styles.settingHint}>
              Always remind me to check the source.
            </Text>
          </View>
          <Switch
            value={showSourceReminders}
            onValueChange={setShowSourceReminders}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>One-tap dismiss</Text>
            <Text style={styles.settingHint}>
              Close the bubble pop-up with a single tap.
            </Text>
          </View>
          <Switch value={oneTapDismiss} onValueChange={setOneTapDismiss} />
        </View>
      </View>
    </ScrollView>
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
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  backText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '500',
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  logoText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    color: '#4B5563',
    marginTop: 4,
    fontSize: 13,
  },
  activeBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  activeBannerTitle: {
    color: '#15803D',
    fontWeight: '700',
  },
  activeBannerBody: {
    color: '#166534',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  expandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandTitle: {
    marginBottom: 0,
    flex: 1,
    marginRight: 8,
  },
  expandIcon: {
    width: 14,
    height: 14,
  },
  cardBody: {
    color: '#4B5563',
    fontSize: 13,
    lineHeight: 19,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmarkIcon: {
    width: 12,
    height: 12,
  },
  checkLabel: {
    flex: 1,
    color: '#1F2937',
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryBtnDisabled: {
    backgroundColor: '#93C5FD',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  successCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#15803D',
  },
  successBody: {
    color: '#374151',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 10,
  },
  onboardNote: {
    backgroundColor: '#EFF6FF',
    color: '#1E3A8A',
    fontSize: 12,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  settingTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
  settingHint: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
  },
  setupRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  setupChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  setupChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  setupChipText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  setupChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setupChipIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
    tintColor: '#374151',
  },
  setupChipIconActive: {
    tintColor: '#fff',
  },
  setupChipTextActive: {
    color: '#fff',
  },
  familyNote: {
    marginTop: 10,
    color: '#1E3A8A',
    fontSize: 12,
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
  },
});
