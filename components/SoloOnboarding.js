// SoloOnboarding
// State B onboarding (proposal §5.2.2). Used when an older or community-
// referred user opens the Checker without a younger relative having
// pre-configured it. Three illustrated slides in plain Bahasa Indonesia,
// each addressing a concern raised by older participants in our interviews:
//
//   1. "Periksa sumber sebelum berbagi" — the tool helps before you share.
//   2. "Kami tidak memberitahu kamu apa yang benar atau salah" —
//      the tool does not act as a final authority on truth (Finding 6).
//   3. "Kamu tetap yang memutuskan" — final decision remains with the user.
//
// After the third slide, a Bahasa consent screen reuses the same three
// agreement points as State A, then activates the Checker with the
// "kinder defaults" — Simple language, Source reminders, One-tap dismiss —
// matching the family-mode defaults in CheckerApp.

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { checkerIcons } from '../data/dummyContent';
import { useT } from '../LanguageContext';

// Illustration URLs (icons8 / generic). Plain, friendly, not figurative.
// Strings are referenced by i18n key so we can flip language at runtime.
const slides = [
  {
    illustration: 'https://img.icons8.com/color/240/search--v1.png',
    titleKey: 'solo.slide1.title',
    bodyKey: 'solo.slide1.body',
  },
  {
    illustration: 'https://img.icons8.com/color/240/question-mark.png',
    titleKey: 'solo.slide2.title',
    bodyKey: 'solo.slide2.body',
  },
  {
    illustration: 'https://img.icons8.com/color/240/touchscreen.png',
    titleKey: 'solo.slide3.title',
    bodyKey: 'solo.slide3.body',
  },
];

export default function SoloOnboarding({ onActivate, onBackHome }) {
  const t = useT();
  // Step 0..2 = illustrated slides. Step 3 = sample-check walkthrough.
  // Step 4 = consent screen. The walkthrough was added in response to
  // usability testing — older users wanted a first-time demonstration of
  // how the Checker works on a real-looking message before activating.
  const [step, setStep] = useState(0);

  // Consent boxes.
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const allAgreed = agree1 && agree2 && agree3;

  function next() {
    if (step < 4) setStep(step + 1);
  }

  function skipToConsent() {
    setStep(4);
  }

  function handleActivate() {
    onActivate();
  }

  // -- Render --------------------------------------------------------------

  if (step <= 2) {
    const slide = slides[step];
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollInner}>
          <View style={styles.topBar}>
            <Pressable onPress={onBackHome}>
              <Text style={styles.cancelText}>{t('common.close')}</Text>
            </Pressable>
            <View style={styles.dots}>
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[styles.dot, i === step && styles.dotActive]}
                />
              ))}
            </View>
            <Pressable onPress={skipToConsent}>
              <Text style={styles.skipText}>{t('common.skip')}</Text>
            </Pressable>
          </View>

          <View style={styles.illustrationWrap}>
            <Image
              source={{ uri: slide.illustration }}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.slideTitle}>{t(slide.titleKey)}</Text>
          <Text style={styles.slideBody}>{t(slide.bodyKey)}</Text>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.primaryBtn} onPress={next}>
            <Text style={styles.primaryBtnText}>{t('common.continue')}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Sample-check walkthrough (step 3) — shows a fake suspicious message and
  // annotated steps so the first independent use is not unfamiliar.
  if (step === 3) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollInner}>
          <View style={styles.topBar}>
            <Pressable onPress={() => setStep(2)}>
              <Text style={styles.cancelText}>← {t('common.back')}</Text>
            </Pressable>
            <View style={styles.dots}>
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[styles.dot, i === step && styles.dotActive]}
                />
              ))}
            </View>
            <Pressable onPress={skipToConsent}>
              <Text style={styles.skipText}>{t('common.skip')}</Text>
            </Pressable>
          </View>

          <Text style={styles.slideTitle}>{t('solo.walkthrough.title')}</Text>
          <Text style={styles.slideBody}>{t('solo.walkthrough.intro')}</Text>

          {/* Sample suspicious WhatsApp-style message */}
          <View style={styles.samplePreview}>
            <Text style={styles.sampleForwarded}>
              {t('solo.walkthrough.sample.forwarded')}
            </Text>
            <Text style={styles.sampleSender}>
              {t('solo.walkthrough.sample.sender')}
            </Text>
            <Text style={styles.sampleText}>
              {t('solo.walkthrough.sample.text')}
            </Text>
          </View>

          {/* Four numbered steps */}
          <WalkthroughStep
            number="1"
            title={t('solo.walkthrough.step1.title')}
            body={t('solo.walkthrough.step1.body')}
          />
          <WalkthroughStep
            number="2"
            title={t('solo.walkthrough.step2.title')}
            body={t('solo.walkthrough.step2.body')}
          />
          <WalkthroughStep
            number="3"
            title={t('solo.walkthrough.step3.title')}
            body={t('solo.walkthrough.step3.body')}
          />
          <WalkthroughStep
            number="4"
            title={t('solo.walkthrough.step4.title')}
            body={t('solo.walkthrough.step4.body')}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.primaryBtn} onPress={next}>
            <Text style={styles.primaryBtnText}>{t('common.understand')}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Consent screen
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollInner}>
        <View style={styles.topBar}>
          <Pressable onPress={() => setStep(3)}>
            <Text style={styles.cancelText}>← {t('common.back')}</Text>
          </Pressable>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
          <View style={{ width: 50 }} />
        </View>

        <Text style={styles.consentTitle}>{t('solo.consent.title')}</Text>

        <View style={styles.card}>
          <ConsentRow
            label={t('checker.agree.1')}
            checked={agree1}
            onToggle={() => setAgree1(!agree1)}
          />
          <ConsentRow
            label={t('checker.agree.2')}
            checked={agree2}
            onToggle={() => setAgree2(!agree2)}
          />
          <ConsentRow
            label={t('checker.agree.3')}
            checked={agree3}
            onToggle={() => setAgree3(!agree3)}
          />
        </View>

        <Text style={styles.defaultsNote}>{t('solo.consent.defaults')}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.primaryBtn,
            !allAgreed && styles.primaryBtnDisabled,
          ]}
          disabled={!allAgreed}
          onPress={handleActivate}
        >
          <Text style={styles.primaryBtnText}>{t('checker.activate')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

// A single numbered step in the sample-check walkthrough.
function WalkthroughStep({ number, title, body }) {
  return (
    <View style={styles.walkRow}>
      <View style={styles.walkNumber}>
        <Text style={styles.walkNumberText}>{number}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.walkTitle}>{title}</Text>
        <Text style={styles.walkBody}>{body}</Text>
      </View>
    </View>
  );
}

// A consent row.
function ConsentRow({ label, checked, onToggle }) {
  return (
    <Pressable style={styles.consentRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <Image
            source={{ uri: checkerIcons.check }}
            style={styles.checkmarkIcon}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.consentLabel}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollInner: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelText: { color: '#6B7280', fontSize: 13 },
  skipText: { color: '#2563EB', fontSize: 13, fontWeight: '600' },
  dots: { flexDirection: 'row', gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  dotActive: { backgroundColor: '#2563EB' },
  illustrationWrap: {
    alignItems: 'center',
    marginVertical: 20,
  },
  illustration: {
    width: 180,
    height: 180,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  slideBody: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
    textAlign: 'center',
  },
  samplePreview: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  sampleForwarded: {
    color: '#92400E',
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  sampleSender: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  sampleText: {
    color: '#1F2937',
    fontSize: 13,
    lineHeight: 18,
  },
  walkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },
  walkNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  walkNumberText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  walkTitle: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  walkBody: {
    color: '#4B5563',
    fontSize: 12,
    lineHeight: 17,
  },
  consentTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmarkIcon: { width: 12, height: 12 },
  consentLabel: {
    color: '#111827',
    fontSize: 13,
    lineHeight: 19,
  },
  defaultsNote: {
    color: '#1E3A8A',
    fontSize: 12,
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 10,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // leave room for the Samsung footer
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  primaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: '#93C5FD' },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

// Grounding note (proposal §5.2.2, Finding 7): SoloOnboarding gives older or
// community-referred users their own entry path with plain Bahasa Indonesia
// copy and kinder defaults, without requiring a younger relative to set up
// the tool on their behalf.
