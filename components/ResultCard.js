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
          text: 'Sumber tampak dikenali.',
        },
        evidence: {
          iconUri: checkerIcons.section.good,
          text: 'Klaim didukung oleh referensi lain.',
        },
        bias: {
          iconUri: checkerIcons.section.warn,
          text: 'Tetap baca lebih dari sekadar judul sebelum membagikan.',
        },
      };
    case 'bias':
      return {
        source: {
          iconUri: checkerIcons.section.warn,
          text: 'Sumber mungkin memiliki sudut pandang yang kuat.',
        },
        evidence: {
          iconUri: checkerIcons.section.warn,
          text: 'Bukti tidak lengkap atau satu sisi.',
        },
        bias: {
          iconUri: checkerIcons.section.warn,
          text: 'Bahasanya emosional. Mungkin mencoba memengaruhi opinimu.',
        },
      };
    case 'low_evidence':
      return {
        source: {
          iconUri: checkerIcons.section.warn,
          text: 'Sumber tidak jelas atau belum terverifikasi.',
        },
        evidence: {
          iconUri: checkerIcons.section.warn,
          text: 'Tidak ada bukti atau referensi yang jelas.',
        },
        bias: {
          iconUri: checkerIcons.section.info,
          text: 'Nadanya terburu-buru atau berdasarkan rumor.',
        },
      };
    case 'misleading':
    default:
      return {
        source: {
          iconUri: checkerIcons.section.bad,
          text: 'Sumber tidak dikenali atau mencurigakan.',
        },
        evidence: {
          iconUri: checkerIcons.section.bad,
          text: 'Klaim tidak didukung (mis. klaim kesehatan yang belum terbukti atau penipuan).',
        },
        bias: {
          iconUri: checkerIcons.section.bad,
          text: 'Menggunakan bahasa yang mendesak, emosional, atau menekan.',
        },
      };
  }
}

function buildNextAction(riskType) {
  switch (riskType) {
    case 'reliable':
      return 'Boleh dibagikan, tapi pertimbangkan menambahkan konteks atau sumber aslinya.';
    case 'bias':
      return 'Bandingkan dengan sumber lain sebelum membagikan. Perhatikan cara pembingkaiannya.';
    case 'low_evidence':
      return 'Berhenti dulu. Tunggu konfirmasi dari sumber terpercaya sebelum membagikan.';
    case 'misleading':
    default:
      return 'Jangan dibagikan. Verifikasi dengan sumber terpercaya dulu.';
  }
}

export default function ResultCard({ content, onClose, interfaceMode = 'self' }) {
  const isFamilyMode = interfaceMode === 'family';
  // Pick the right template + references using the selected content.
  const template = resultTemplates[content.riskType] || resultTemplates.low_evidence;
  const statusIcon =
    checkerIcons.status[content.riskType] || checkerIcons.status.low_evidence;
  const refs = referencesByCategory[content.contentCategory] || [];
  const checks = buildSectionChecks(content.riskType);
  const nextAction = buildNextAction(content.riskType);

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
            Hati-hati — tanda peringatan terdeteksi
          </Text>
        </View>
      )}

      {/* Big judgement label. Extra red border for misleading; verified-style
          green border for reliable. */}
      <View
        style={[
          styles.labelBox,
          { backgroundColor: template.color },
          isMisleading && styles.labelBoxDanger,
          isReliable && styles.labelBoxVerified,
        ]}
      >
        <Image source={{ uri: statusIcon }} style={[styles.labelIcon, isFamilyMode && styles.labelIconLg]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.labelText, isFamilyMode && styles.labelTextLg]}>
            {template.label}
          </Text>
          <Text style={[styles.labelSub, isFamilyMode && styles.labelSubLg]}>
            Keputusan akhir tetap di tanganmu.
          </Text>
        </View>
      </View>

      <Text style={[styles.explanation, isFamilyMode && styles.explanationLg]}>
        {template.explanation}
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
          Tindakan selanjutnya yang disarankan
        </Text>
        <Text
          style={[
            styles.actionText,
            isFamilyMode && styles.actionTextLg,
            isMisleading && styles.actionTextDanger,
          ]}
        >
          {nextAction}
        </Text>
      </View>

      {/* Three quick checks — always visible, short bullet rows. */}
      <Section title="Pemeriksaan sumber" item={checks.source} large={isFamilyMode} />
      <Section title="Pemeriksaan bukti" item={checks.evidence} large={isFamilyMode} />
      <Section title="Bias / bahasa emosional" item={checks.bias} large={isFamilyMode} />

      {/* Everything else lives behind a single expander to keep the page
          short. Open by default for misleading content where the literacy
          reminders matter most. */}
      <Pressable
        style={styles.detailToggle}
        onPress={() => setDetailsOpen(!detailsOpen)}
      >
        <Text style={[styles.detailToggleText, isFamilyMode && styles.detailToggleTextLg]}>
          {detailsOpen ? 'Sembunyikan detail' : 'Lihat detail lengkap'}
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
              Pengingat Literasi Digital
            </Text>
            {literacyQuestions.map((q, i) => (
              <Text key={i} style={[styles.bullet, isFamilyMode && styles.bulletLg]}>
                • {q}
              </Text>
            ))}
          </View>

          {/* Section: References */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isFamilyMode && styles.sectionTitleLg]}>
              Referensi yang disarankan untuk dibandingkan
            </Text>
            {refs.map((r, i) => (
              <View key={i} style={styles.refRow}>
                <Image source={{ uri: checkerIcons.link }} style={styles.refIcon} />
                <Text style={[styles.refItem, isFamilyMode && styles.refItemLg]}>
                  {r}
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
          Tutup
        </Text>
      </Pressable>
    </ScrollView>
  );
}

// Tiny helper component so each labelled section looks the same.
function Section({ title, item, large = false }) {
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
          {item.text}
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
