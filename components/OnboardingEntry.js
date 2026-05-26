// OnboardingEntry
// First screen shown when the Checker app is opened for the first time
// (proposal §5.2.1–§5.2.3). The chooser is now two equal side-by-side
// cards plus a survey-style "Saya tiba di sini melalui" section below.
//
// Mapping:
//   - "Saya sendiri"           → solo path (SoloOnboarding walkthrough) + family mode.
//     This is the elderly user installing for themselves and getting the
//     first-time guided demo.
//   - "Untuk orang tua atau
//      keluarga"               → assisted path (CheckerApp settings) + family mode.
//     This is a digitally-literate helper configuring the app on behalf of
//     an older relative.
//
// Both paths end up in family mode so the elderly user always sees the
// large, simpler interface.

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { checkerIcons } from '../data/dummyContent';
import { useT } from '../LanguageContext';

export default function OnboardingEntry({
  onPickAssisted,
  onPickSolo,
  onBackHome,
}) {
  const t = useT();
  // The "Saya tiba di sini melalui" section is a survey — it captures
  // where the user heard about the app, but it does NOT trigger install.
  // Install only happens via the two main mode cards above.
  //   surveyChoice: null | 'qr' | 'whatsapp' | 'kemenkomdigi' | 'other'
  const [surveyChoice, setSurveyChoice] = useState(null);
  const [otherText, setOtherText] = useState('');

  function pickSurvey(key) {
    setSurveyChoice(key);
  }

  function submitOther() {
    if (otherText.trim().length === 0) return;
    setSurveyChoice('other');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* Top bar */}
      <View style={styles.header}>
        <Pressable onPress={onBackHome}>
          <Text style={styles.cancelText}>← {t('common.home')}</Text>
        </Pressable>
      </View>

      {/* Logo + title (subtitle removed per design feedback) */}
      <View style={styles.logoArea}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>LC</Text>
        </View>
        <Text style={styles.title}>Legitimate Checker</Text>
      </View>

      <Text style={styles.sectionLabel}>{t('onboard.whoWillUse')}</Text>

      {/* Two equal side-by-side cards. Same size and same colour — the
          interface adapts based on which one is chosen, but neither card is
          visually privileged on the chooser screen. */}
      <View style={styles.modeRow}>
        <Pressable
          style={styles.modeCard}
          onPress={() => onPickSolo('family')}
        >
          <Image source={{ uri: checkerIcons.self }} style={styles.modeIcon} />
          <Text style={styles.modeTitle}>{t('onboard.self')}</Text>
        </Pressable>

        <Pressable
          style={styles.modeCard}
          onPress={() => onPickAssisted('family')}
        >
          <Image
            source={{ uri: checkerIcons.family }}
            style={styles.modeIcon}
          />
          <Text style={styles.modeTitle}>{t('onboard.forFamily')}</Text>
        </Pressable>
      </View>

      {/* Community entry — survey-style. The four predefined options route
          straight to family mode; the "Lainnya" row lets the user type a
          custom channel and submit. */}
      <Text style={[styles.sectionLabel, styles.surveyLabel]}>
        {t('onboard.survey.title')}
      </Text>

      <SurveyOption
        title={t('onboard.survey.qr')}
        emoji="🟦"
        selected={surveyChoice === 'qr'}
        onPress={() => pickSurvey('qr')}
      />
      <SurveyOption
        title={t('onboard.survey.wa')}
        emoji="🟩"
        selected={surveyChoice === 'whatsapp'}
        onPress={() => pickSurvey('whatsapp')}
      />
      <SurveyOption
        title={t('onboard.survey.gov')}
        emoji="🟧"
        selected={surveyChoice === 'kemenkomdigi'}
        onPress={() => pickSurvey('kemenkomdigi')}
      />

      {/* "Lainnya" — free-text survey input. Submitting marks this row as
          the selected survey answer but does not start onboarding. */}
      <View
        style={[
          styles.otherCard,
          surveyChoice === 'other' && styles.otherCardSelected,
        ]}
      >
        <View
          style={[
            styles.radio,
            surveyChoice === 'other' && styles.radioSelected,
          ]}
        />
        <Text style={styles.communityEmoji}>✏️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.otherLabel}>{t('onboard.survey.other')}</Text>
          <View style={styles.otherInputRow}>
            <TextInput
              style={styles.otherInput}
              placeholder={t('onboard.survey.otherPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={otherText}
              onChangeText={setOtherText}
              onSubmitEditing={submitOther}
              returnKeyType="send"
            />
            <Pressable
              style={[
                styles.otherSubmit,
                otherText.trim().length === 0 && styles.otherSubmitDisabled,
              ]}
              onPress={submitOther}
              disabled={otherText.trim().length === 0}
            >
              <Text style={styles.otherSubmitText}>{t('common.send')}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Light confirmation that the survey choice was recorded. */}
      {surveyChoice && (
        <Text style={styles.surveyConfirm}>{t('onboard.survey.thanks')}</Text>
      )}
    </ScrollView>
  );
}

function SurveyOption({ title, emoji, selected, onPress }) {
  return (
    <Pressable
      style={[styles.communityCard, selected && styles.communityCardSelected]}
      onPress={onPress}
    >
      <View style={[styles.radio, selected && styles.radioSelected]} />
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
  sectionLabel: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  surveyLabel: {
    marginTop: 28,
  },

  // -----------------------------------------------------------------------
  // Two equal mode cards, side by side.
  // -----------------------------------------------------------------------
  modeRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  modeIcon: {
    width: 36,
    height: 36,
    marginBottom: 12,
    tintColor: '#2563EB',
  },
  modeTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    textAlign: 'center',
  },

  // -----------------------------------------------------------------------
  // Community survey section.
  // -----------------------------------------------------------------------
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
  communityCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
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
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  // "Lainnya" free-text row.
  otherCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  otherCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  surveyConfirm: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 6,
  },
  otherLabel: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  otherInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  otherInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  otherSubmit: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  otherSubmitDisabled: {
    backgroundColor: '#93C5FD',
  },
  otherSubmitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});

// Grounding note (proposal §5.2.1–§5.2.3): the entry chooser presents the
// two paths as equal options. Both land in family mode (large interface)
// because the eventual user is always the elderly family member — the
// distinction is only whether they walked up themselves (gets the
// walkthrough) or whether a relative is configuring on their behalf.
