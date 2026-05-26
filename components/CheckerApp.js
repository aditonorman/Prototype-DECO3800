// CheckerApp
// The Legitimate Checker app screen.
// Three "sub-views":
//   1. Intro + agreement checkboxes + Activate button
//   2. Success screen after activation
//   3. Small settings list (always shown if checker already active)

import { useState } from 'react';
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
import { useT } from '../LanguageContext';

// A small checkbox row component used in the agreement card.
function CheckRow({ label, checked, onToggle, large = false }) {
  return (
    <Pressable
      style={[styles.checkRow, large && styles.checkRowLg]}
      onPress={onToggle}
    >
      <View
        style={[
          styles.checkbox,
          large && styles.checkboxLg,
          checked && styles.checkboxChecked,
        ]}
      >
        {checked && (
          <Image
            source={{ uri: checkerIcons.check }}
            style={[styles.checkmarkIcon, large && styles.checkmarkIconLg]}
          />
        )}
      </View>
      <Text style={[styles.checkLabel, large && styles.checkLabelLg]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function CheckerApp({
  onActivate,
  onBackHome,
  checkerActive,
  interfaceMode = 'self',
}) {
  const t = useT();

  // Three agreement boxes — all three must be ticked to activate.
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  // After tapping Activate we briefly show a confirmation view inside the app.
  const [justActivated, setJustActivated] = useState(false);

  // Finding 4 — plain-language algorithm explainer is hidden behind a tap
  // so it does not crowd the page, but is offered to anyone who wants it.
  const [showAlgoExplainer, setShowAlgoExplainer] = useState(false);

  // Family mode is now decided once at OnboardingEntry, so we don't need
  // an in-app "Untuk siapa ini?" toggle anymore. Family mode applies a
  // larger, simpler interface for elderly users and switches a few defaults.
  const isFamilyMode = interfaceMode === 'family';

  // Settings — these are visual only, they don't change behaviour.
  // Family mode flips the defaults to be friendlier.
  const [simpleLanguage, setSimpleLanguage] = useState(true);
  const [showSourceReminders, setShowSourceReminders] = useState(true);
  const [oneTapDismiss, setOneTapDismiss] = useState(isFamilyMode);

  const allAgreed = agree1 && agree2 && agree3;

  // Handle the Activate button.
  function handleActivate() {
    onActivate();
    setJustActivated(true);
  }

  return (
    <ScrollView
      style={styles.container}
      // Generous bottom padding so the Activate button + settings always
      // clear the Samsung footer, especially in family mode where text is
      // taller and the page is longer.
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header bar with back button */}
      <View style={styles.header}>
        <Pressable onPress={onBackHome} style={styles.backBtn}>
          <Text style={[styles.backText, isFamilyMode && styles.backTextLg]}>
            ← {t('common.home')}
          </Text>
        </Pressable>
      </View>

      {/* Mode pill — quick visual signal so a setup-helper can see at a glance
          which mode the app is currently configured for. */}
      <View style={styles.modePillRow}>
        <View
          style={[
            styles.modePill,
            isFamilyMode ? styles.modePillFamily : styles.modePillSelf,
          ]}
        >
          <Text
            style={[
              styles.modePillText,
              isFamilyMode && styles.modePillTextFamily,
            ]}
          >
            {isFamilyMode ? t('checker.mode.family') : t('checker.mode.self')}
          </Text>
        </View>
      </View>

      {/* Logo + title */}
      <View style={styles.logoArea}>
        <View
          style={[styles.logoCircle, isFamilyMode && styles.logoCircleLg]}
        >
          <Text style={[styles.logoText, isFamilyMode && styles.logoTextLg]}>
            LC
          </Text>
        </View>
        <Text style={[styles.title, isFamilyMode && styles.titleLg]}>
          Legitimate Checker
        </Text>
        <Text style={[styles.subtitle, isFamilyMode && styles.subtitleLg]}>
          {t('checker.tagline')}
        </Text>
      </View>

      {/* If user just activated OR already active, show success view */}
      {(justActivated || checkerActive) && !justActivated && (
        <View style={styles.activeBanner}>
          <View style={styles.statusRow}>
            <Image source={{ uri: checkerIcons.active }} style={styles.statusIcon} />
            <Text style={styles.activeBannerTitle}>{t('checker.active.title')}</Text>
          </View>
          <Text style={styles.activeBannerBody}>{t('checker.active.body')}</Text>
        </View>
      )}

      {justActivated ? (
        // Big success screen shown right after the user activates the checker.
        <View style={styles.successCard}>
          <View style={styles.statusRow}>
            <Image source={{ uri: checkerIcons.active }} style={styles.statusIcon} />
            <Text style={styles.successTitle}>{t('checker.active.title')}</Text>
          </View>
          <Text style={styles.successBody}>{t('checker.active.short')}</Text>
          <Text style={styles.onboardNote}>{t('checker.activated.note')}</Text>
          <Pressable style={styles.primaryBtn} onPress={onBackHome}>
            <Text style={styles.primaryBtnText}>{t('checker.backHome')}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Purpose card */}
          <View style={styles.card}>
            <Text style={[styles.cardTitle, isFamilyMode && styles.cardTitleLg]}>
              {t('checker.purpose.title')}
            </Text>
            <Text style={[styles.cardBody, isFamilyMode && styles.cardBodyLg]}>
              {t('checker.purpose.body')}
            </Text>
          </View>

          {/* Plain-language "why am I seeing this?" — Finding 4.
              Hidden behind a tap so it doesn't crowd the page. */}
          <View style={styles.card}>
            <Pressable
              style={styles.expandHeader}
              onPress={() => setShowAlgoExplainer(!showAlgoExplainer)}
            >
              <Text
                style={[
                  styles.cardTitle,
                  styles.expandTitle,
                  isFamilyMode && styles.cardTitleLg,
                ]}
              >
                {t('checker.algo.title')}
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
              <Text style={[styles.cardBody, isFamilyMode && styles.cardBodyLg]}>
                {t('checker.algo.body')}
              </Text>
            )}
          </View>

          {/* Agreement card — only shown if not already active */}
          {!checkerActive && (
            <View style={styles.card}>
              <Text style={[styles.cardTitle, isFamilyMode && styles.cardTitleLg]}>
                {t('checker.agree.title')}
              </Text>
              <CheckRow
                label={t('checker.agree.1')}
                checked={agree1}
                onToggle={() => setAgree1(!agree1)}
                large={isFamilyMode}
              />
              <CheckRow
                label={t('checker.agree.2')}
                checked={agree2}
                onToggle={() => setAgree2(!agree2)}
                large={isFamilyMode}
              />
              <CheckRow
                label={t('checker.agree.3')}
                checked={agree3}
                onToggle={() => setAgree3(!agree3)}
                large={isFamilyMode}
              />

              <Pressable
                style={[
                  styles.primaryBtn,
                  isFamilyMode && styles.primaryBtnLg,
                  !allAgreed && styles.primaryBtnDisabled,
                ]}
                disabled={!allAgreed}
                onPress={handleActivate}
              >
                <Text
                  style={[
                    styles.primaryBtnText,
                    isFamilyMode && styles.primaryBtnTextLg,
                  ]}
                >
                  {t('checker.activate')}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}

      {/* Settings — always available */}
      <View style={styles.card}>
        <Text style={[styles.cardTitle, isFamilyMode && styles.cardTitleLg]}>
          {t('checker.settings.title')}
        </Text>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.settingTitle, isFamilyMode && styles.settingTitleLg]}
            >
              {t('checker.settings.simple.title')}
            </Text>
            <Text
              style={[styles.settingHint, isFamilyMode && styles.settingHintLg]}
            >
              {t('checker.settings.simple.hint')}
            </Text>
          </View>
          <Switch value={simpleLanguage} onValueChange={setSimpleLanguage} />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.settingTitle, isFamilyMode && styles.settingTitleLg]}
            >
              {t('checker.settings.source.title')}
            </Text>
            <Text style={[styles.settingHint, isFamilyMode && styles.settingHintLg]}>
              {t('checker.settings.source.hint')}
            </Text>
          </View>
          <Switch
            value={showSourceReminders}
            onValueChange={setShowSourceReminders}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.settingTitle, isFamilyMode && styles.settingTitleLg]}
            >
              {t('checker.settings.dismiss.title')}
            </Text>
            <Text style={[styles.settingHint, isFamilyMode && styles.settingHintLg]}>
              {t('checker.settings.dismiss.hint')}
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
  // -----------------------------------------------------------------------
  // Mode pill — visible at the top of the screen so a helper can see which
  // interface mode is currently in effect.
  // -----------------------------------------------------------------------
  modePillRow: {
    alignItems: 'center',
    marginBottom: 4,
  },
  modePill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  modePillSelf: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  modePillFamily: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F59E0B',
  },
  modePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
  modePillTextFamily: {
    fontSize: 14,
    color: '#92400E',
  },

  // -----------------------------------------------------------------------
  // Family-mode size overrides. Layered on top of the base styles via array
  // notation, e.g. style={[styles.title, isFamilyMode && styles.titleLg]}.
  // Sizes are deliberately modest — bigger than self mode but still fitting
  // the 380 px phone frame without overflow or clipping.
  // -----------------------------------------------------------------------
  backTextLg: { fontSize: 16 },

  logoCircleLg: { width: 78, height: 78, borderRadius: 39 },
  logoTextLg: { fontSize: 28 },

  titleLg: { fontSize: 25, lineHeight: 30 },
  subtitleLg: { fontSize: 14, lineHeight: 20, marginTop: 4 },

  cardTitleLg: { fontSize: 17, lineHeight: 22, marginBottom: 10 },
  cardBodyLg: { fontSize: 15, lineHeight: 22 },

  checkRowLg: { paddingVertical: 12 },
  checkboxLg: { width: 26, height: 26, borderRadius: 7, marginRight: 12 },
  checkmarkIconLg: { width: 15, height: 15 },
  checkLabelLg: { fontSize: 15, lineHeight: 21 },

  primaryBtnLg: { paddingVertical: 14, borderRadius: 14, marginTop: 14 },
  primaryBtnTextLg: { fontSize: 17 },

  settingTitleLg: { fontSize: 16, lineHeight: 21 },
  settingHintLg: { fontSize: 13, marginTop: 3 },
});
