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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {
  checkerIcons,
  resultTemplates,
  referencesByCategory,
  literacyQuestions,
} from '../data/dummyContent';

// Build a small per-section checklist. The text changes with the riskType so
// the result feels related to the content, while staying simple to maintain.
function buildSectionChecks(riskType) {
  switch (riskType) {
    case 'reliable':
      return {
        source: {
          iconUri: checkerIcons.section.good,
          text: 'Source appears recognised.',
        },
        evidence: {
          iconUri: checkerIcons.section.good,
          text: 'Claim is supported by other references.',
        },
        bias: {
          iconUri: checkerIcons.section.warn,
          text: 'Always read beyond the headline before sharing.',
        },
      };
    case 'bias':
      return {
        source: {
          iconUri: checkerIcons.section.warn,
          text: 'Source may have a strong viewpoint.',
        },
        evidence: {
          iconUri: checkerIcons.section.warn,
          text: 'Evidence is partial or one-sided.',
        },
        bias: {
          iconUri: checkerIcons.section.warn,
          text: 'Language is emotional. It may try to influence your opinion.',
        },
      };
    case 'low_evidence':
      return {
        source: {
          iconUri: checkerIcons.section.warn,
          text: 'Source is unclear or unverified.',
        },
        evidence: {
          iconUri: checkerIcons.section.warn,
          text: 'No clear evidence or references.',
        },
        bias: {
          iconUri: checkerIcons.section.info,
          text: 'Tone is rushed or based on rumour.',
        },
      };
    case 'misleading':
    default:
      return {
        source: {
          iconUri: checkerIcons.section.bad,
          text: 'Source is unknown or suspicious.',
        },
        evidence: {
          iconUri: checkerIcons.section.bad,
          text: 'Claim is unsupported (e.g. unproven health/scam claim).',
        },
        bias: {
          iconUri: checkerIcons.section.bad,
          text: 'Uses urgent, emotional, or pressuring language.',
        },
      };
  }
}

function buildNextAction(riskType) {
  switch (riskType) {
    case 'reliable':
      return 'You may share, but consider adding context or the original source.';
    case 'bias':
      return 'Compare with another source before sharing. Notice the framing.';
    case 'low_evidence':
      return 'Pause. Wait for confirmation from a reliable source before sharing.';
    case 'misleading':
    default:
      return 'Do not share. Verify with a trusted source first.';
  }
}

export default function ResultCard({ content, onClose }) {
  // Pick the right template + references using the selected content.
  const template = resultTemplates[content.riskType] || resultTemplates.low_evidence;
  const statusIcon =
    checkerIcons.status[content.riskType] || checkerIcons.status.low_evidence;
  const refs = referencesByCategory[content.contentCategory] || [];
  const checks = buildSectionChecks(content.riskType);
  const nextAction = buildNextAction(content.riskType);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
    >
      {/* Big judgement label */}
      <View style={[styles.labelBox, { backgroundColor: template.color }]}>
        <Image source={{ uri: statusIcon }} style={styles.labelIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.labelText}>{template.label}</Text>
          <Text style={styles.labelSub}>Final decision remains with you.</Text>
        </View>
      </View>

      <Text style={styles.explanation}>{template.explanation}</Text>

      {/* Section: Source check */}
      <Section title="Source check" item={checks.source} />

      {/* Section: Evidence check */}
      <Section title="Evidence check" item={checks.evidence} />

      {/* Section: Bias / emotional language check */}
      <Section title="Bias / emotional language" item={checks.bias} />

      {/* Section: Digital literacy reminder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Digital Literacy Reminder</Text>
        {literacyQuestions.map((q, i) => (
          <Text key={i} style={styles.bullet}>
            • {q}
          </Text>
        ))}
      </View>

      {/* Section: References */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested references to compare</Text>
        {refs.map((r, i) => (
          <View key={i} style={styles.refRow}>
            <Image source={{ uri: checkerIcons.link }} style={styles.refIcon} />
            <Text style={styles.refItem}>{r}</Text>
          </View>
        ))}
      </View>

      {/* Section: Recommended next action */}
      <View style={[styles.section, styles.actionSection]}>
        <Text style={styles.sectionTitle}>Recommended next action</Text>
        <Text style={styles.actionText}>{nextAction}</Text>
      </View>

      {/* Soft reminder line */}
      <Text style={styles.disclaimer}>
        This tool is a guide. It does not decide truth for you. Check before sharing.
      </Text>

      {/* Close button */}
      <Pressable style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </ScrollView>
  );
}

// Tiny helper component so each labelled section looks the same.
function Section({ title, item }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBodyRow}>
        <Image source={{ uri: item.iconUri }} style={styles.sectionIcon} />
        <Text style={styles.sectionBody}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 4,
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
  disclaimer: {
    color: '#6B7280',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
    fontStyle: 'italic',
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
});
