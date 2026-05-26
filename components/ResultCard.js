// ResultCard
// The "result" view shown after the user taps "Check this content".
// It contains:
//   1. Overall judgement label (with colour and icon)
//   2. Source check
//   3. Evidence check
//   4. Bias / emotional language check
//   5. Digital Literacy Reminder
//   6. References
//   7. Recommended next action
// Wording is intentionally soft — never "true" or "false".

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { checkerIcons } from '../data/dummyContent';
import { useT } from '../LanguageContext';

// Map result.riskType to the i18n keys for label and explanation.
const resultLabelKey = {
  reliable: 'result.reliable.label',
  bias: 'result.bias.label',
  low_evidence: 'result.low_evidence.label',
  misleading: 'result.misleading.label',
};
const resultExplanationKey = {
  reliable: 'result.reliable.explanation',
  bias: 'result.bias.explanation',
  low_evidence: 'result.low_evidence.explanation',
  misleading: 'result.misleading.explanation',
};

// Risk-type → soft tint colour (kept here so we don't depend on dummyContent
// for the visual palette either).
const resultColor = {
  reliable: '#16A34A',
  bias: '#F59E0B',
  low_evidence: '#6B7280',
  misleading: '#DC2626',
};

// Reference list keys per category (1..N per category).
const referenceKeysByCategory = {
  health: ['ref.health.1', 'ref.health.2', 'ref.health.3'],
  political: ['ref.political.1', 'ref.political.2', 'ref.political.3'],
  scam: ['ref.scam.1', 'ref.scam.2', 'ref.scam.3'],
  celebrity: ['ref.celebrity.1', 'ref.celebrity.2', 'ref.celebrity.3'],
  news: ['ref.news.1', 'ref.news.2', 'ref.news.3'],
  lifestyle: ['ref.lifestyle.1', 'ref.lifestyle.2'],
  family: ['ref.family.1', 'ref.family.2'],
};

const literacyKeys = [
  'literacy.1',
  'literacy.2',
  'literacy.3',
  'literacy.4',
  'literacy.5',
  'literacy.6',
];

// Build a small per-section checklist. The text changes with the riskType so
// the result feels related to the content, while staying simple to maintain.
// Returns i18n keys; the component renders them via t().
function buildSectionChecks(riskType) {
  switch (riskType) {
    case 'reliable':
      return {
        source: { iconUri: checkerIcons.section.good, textKey: 'check.reliable.source' },
        evidence: { iconUri: checkerIcons.section.good, textKey: 'check.reliable.evidence' },
        bias: { iconUri: checkerIcons.section.warn, textKey: 'check.reliable.bias' },
      };
    case 'bias':
      return {
        source: { iconUri: checkerIcons.section.warn, textKey: 'check.bias.source' },
        evidence: { iconUri: checkerIcons.section.warn, textKey: 'check.bias.evidence' },
        bias: { iconUri: checkerIcons.section.warn, textKey: 'check.bias.bias' },
      };
    case 'low_evidence':
      return {
        source: { iconUri: checkerIcons.section.warn, textKey: 'check.low_evidence.source' },
        evidence: { iconUri: checkerIcons.section.warn, textKey: 'check.low_evidence.evidence' },
        bias: { iconUri: checkerIcons.section.info, textKey: 'check.low_evidence.bias' },
      };
    case 'misleading':
    default:
      return {
        source: { iconUri: checkerIcons.section.bad, textKey: 'check.misleading.source' },
        evidence: { iconUri: checkerIcons.section.bad, textKey: 'check.misleading.evidence' },
        bias: { iconUri: checkerIcons.section.bad, textKey: 'check.misleading.bias' },
      };
  }
}

function nextActionKey(riskType) {
  switch (riskType) {
    case 'reliable':
      return 'next.reliable';
    case 'bias':
      return 'next.bias';
    case 'low_evidence':
      return 'next.low_evidence';
    case 'misleading':
    default:
      return 'next.misleading';
  }
}

export default function ResultCard({ content, onClose, interfaceMode = 'self' }) {
  const t = useT();
  const isFamilyMode = interfaceMode === 'family';
  // Pick the right keys + colour for this risk type.
  const labelKey = resultLabelKey[content.riskType] || resultLabelKey.low_evidence;
  const explanationKey =
    resultExplanationKey[content.riskType] || resultExplanationKey.low_evidence;
  const color = resultColor[content.riskType] || resultColor.low_evidence;
  const statusIcon =
    checkerIcons.status[content.riskType] || checkerIcons.status.low_evidence;
  const refKeys = referenceKeysByCategory[content.contentCategory] || [];
  const checks = buildSectionChecks(content.riskType);
  const nextActionStr = t(nextActionKey(content.riskType));

  // Detail sections collapsed by default (testing feedback: results page felt
  // cluttered and repetitive). The high-level result and the three checks
  // stay visible; literacy reminders + references hide behind an expander.
  const [detailsOpen, setDetailsOpen] = useState(false);

  const isMisleading = content.riskType === 'misleading';
  const isReliable = content.riskType === 'reliable';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
    >
      {/* Strong warning banner for misleading content — testing feedback
          asked for stronger visual signals at a glance. */}
      {isMisleading && (
        <View style={styles.warningBanner}>
          <Image
            source={{ uri: checkerIcons.section.bad }}
            style={[
              styles.warningBannerIcon,
              isFamilyMode && styles.warningBannerIconLg,
            ]}
          />
          <Text
            style={[
              styles.warningBannerText,
              isFamilyMode && styles.warningBannerTextLg,
            ]}
          >
            {t('rc.warningBanner')}
          </Text>
        </View>
      )}

      {/* Big judgement label. Extra red border for misleading; verified-style
          green border for reliable. */}
      <View
        style={[
          styles.labelBox,
          { backgroundColor: color },
          isMisleading && styles.labelBoxDanger,
          isReliable && styles.labelBoxVerified,
        ]}
      >
        <Image source={{ uri: statusIcon }} style={[styles.labelIcon, isFamilyMode && styles.labelIconLg]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.labelText, isFamilyMode && styles.labelTextLg]}>
            {t(labelKey)}
          </Text>
          <Text style={[styles.labelSub, isFamilyMode && styles.labelSubLg]}>
            {t('rc.finalDecision')}
          </Text>
        </View>
      </View>

      <Text style={[styles.explanation, isFamilyMode && styles.explanationLg]}>
        {t(explanationKey)}
      </Text>

      {/* Recommended next action — promoted up so the most important
          guidance is near the top, not buried at the bottom. */}
      <View
        style={[
          styles.section,
          styles.actionSection,
          isMisleading && styles.actionSectionDanger,
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            isFamilyMode && styles.sectionTitleLg,
            isMisleading && styles.sectionTitleDanger,
          ]}
        >
          {t('rc.nextAction')}
        </Text>
        <Text
          style={[
            styles.actionText,
            isFamilyMode && styles.actionTextLg,
            isMisleading && styles.actionTextDanger,
          ]}
        >
          {nextActionStr}
        </Text>
      </View>

      {/* Three quick checks — always visible, short bullet rows. */}
      <Section title={t('rc.sourceCheck')} item={checks.source} large={isFamilyMode} />
      <Section title={t('rc.evidenceCheck')} item={checks.evidence} large={isFamilyMode} />
      <Section title={t('rc.biasCheck')} item={checks.bias} large={isFamilyMode} />

      {/* Everything else lives behind a single expander to keep the page
          short. Open by default for misleading content where the literacy
          reminders matter most. */}
      <Pressable
        style={styles.detailToggle}
        onPress={() => setDetailsOpen(!detailsOpen)}
      >
        <Text style={[styles.detailToggleText, isFamilyMode && styles.detailToggleTextLg]}>
          {detailsOpen ? t('rc.hideDetails') : t('rc.seeDetails')}
        </Text>
        <Text style={styles.detailToggleChevron}>
          {detailsOpen ? '▴' : '▾'}
        </Text>
      </Pressable>

      {detailsOpen && (
        <>
          {/* Section: Digital literacy reminder */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isFamilyMode && styles.sectionTitleLg]}>
              {t('rc.literacyReminder')}
            </Text>
            {literacyKeys.map((key) => (
              <Text key={key} style={[styles.bullet, isFamilyMode && styles.bulletLg]}>
                • {t(key)}
              </Text>
            ))}
          </View>

          {/* Section: References */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isFamilyMode && styles.sectionTitleLg]}>
              {t('rc.references')}
            </Text>
            {refKeys.map((key) => (
              <View key={key} style={styles.refRow}>
                <Image source={{ uri: checkerIcons.link }} style={styles.refIcon} />
                <Text style={[styles.refItem, isFamilyMode && styles.refItemLg]}>
                  {t(key)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Close button */}
      <Pressable
        style={[styles.closeBtn, isFamilyMode && styles.closeBtnLg]}
        onPress={onClose}
      >
        <Text style={[styles.closeText, isFamilyMode && styles.closeTextLg]}>
          {t('common.close')}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

// Tiny helper component so each labelled section looks the same.
// `item.textKey` is an i18n key; we resolve it inside the helper so the row
// re-renders when the language changes.
function Section({ title, item, large = false }) {
  const t = useT();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, large && styles.sectionTitleLg]}>
        {title}
      </Text>
      <View style={styles.sectionBodyRow}>
        <Image
          source={{ uri: item.iconUri }}
          style={[styles.sectionIcon, large && styles.sectionIconLg]}
        />
        <Text style={[styles.sectionBody, large && styles.sectionBodyLg]}>
          {t(item.textKey)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 4,
  },
  warningBanner: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningBannerIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  warningBannerText: {
    color: '#991B1B',
    fontWeight: '700',
    fontSize: 13,
    flex: 1,
  },
  labelBoxDanger: {
    borderWidth: 3,
    borderColor: '#991B1B',
  },
  labelBoxVerified: {
    borderWidth: 3,
    borderColor: '#14532D',
  },
  actionSectionDanger: {
    backgroundColor: '#FEE2E2',
  },
  sectionTitleDanger: {
    color: '#991B1B',
  },
  actionTextDanger: {
    color: '#991B1B',
    fontWeight: '600',
  },
  detailToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: 10,
  },
  detailToggleText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 13,
  },
  detailToggleChevron: {
    color: '#2563EB',
    fontSize: 14,
  },
  labelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    marginTop: 4,
  },
  labelIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  labelSub: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 12,
    marginTop: 2,
  },
  explanation: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  section: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  actionSection: {
    backgroundColor: '#EFF6FF',
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    fontSize: 13,
  },
  sectionBody: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
  sectionBodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sectionIcon: {
    width: 12,
    height: 12,
    marginRight: 7,
    marginTop: 3,
  },
  bullet: {
    color: '#374151',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 2,
  },
  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  refIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  refItem: {
    color: '#1E40AF',
    fontSize: 13,
    flex: 1,
  },
  actionText: {
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '500',
  },
  closeBtn: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },

  // -----------------------------------------------------------------------
  // Family-mode size overrides — modest bump, fits the 380 px phone frame.
  // -----------------------------------------------------------------------
  warningBannerIconLg: { width: 22, height: 22, marginRight: 10 },
  warningBannerTextLg: { fontSize: 14, lineHeight: 19 },

  labelIconLg: { width: 26, height: 26, marginRight: 12 },
  labelTextLg: { fontSize: 20, lineHeight: 25 },
  labelSubLg: { fontSize: 13, marginTop: 3 },

  explanationLg: { fontSize: 14, lineHeight: 20 },

  sectionTitleLg: { fontSize: 14, lineHeight: 19, marginBottom: 8 },
  sectionBodyLg: { fontSize: 14, lineHeight: 20 },
  sectionIconLg: { width: 18, height: 18, marginRight: 10 },

  actionTextLg: { fontSize: 14, lineHeight: 20 },

  bulletLg: { fontSize: 13, lineHeight: 19, marginBottom: 3 },
  refItemLg: { fontSize: 14, lineHeight: 20 },

  detailToggleTextLg: { fontSize: 14 },

  closeBtnLg: { paddingVertical: 14, borderRadius: 14 },
  closeTextLg: { fontSize: 16 },
});
