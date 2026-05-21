// SourceVerificationModal
// The "source-verification layer" described in proposal §5.4.
//
// Renders as a panel inside the existing CheckerModal bottom sheet — it is
// NOT a real OS-level modal. It sits between the confirm step (which only
// asks "who posted this?") and the full result card (which gives the soft
// judgement label). The intent is to make source verification its own
// reflective step so the user is shown the *source's own profile* before any
// verdict is offered.
//
// Findings grounding this component:
//   - Finding 5 — source is the dominant credibility cue.
//   - Finding 6 — users want sources, not verdicts.
//   - Finding 4 — wording must be plain and in Bahasa Indonesia.

import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import {
  lookupSourceVerification,
  verificationLabels,
} from '../data/dummyContent';

export default function SourceVerificationModal({
  selectedContent,
  onSeeResult,
  onBack,
  showTooltip,
  onDismissTooltip,
}) {
  // If for some reason no content is selected, show a friendly fallback.
  if (!selectedContent) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Periksa sumber</Text>
        <Text style={styles.body}>
          Tidak ada konten yang dipilih. Silakan pilih unggahan terlebih dahulu.
        </Text>
        <Pressable style={styles.primaryBtn} onPress={onBack}>
          <Text style={styles.primaryBtnText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  const record = lookupSourceVerification(selectedContent.source);
  const verdict = verificationLabels[record.verdict] || verificationLabels.unconfirmed;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
    >
      {/* Eyebrow + source-first title */}
      <Text style={styles.eyebrow}>Periksa sumber</Text>
      <Text style={styles.title}>Apa yang dikatakan sumbernya?</Text>

      {/* One-time tooltip for solo-onboarded users explaining the step */}
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            Periksa sumbernya langsung — langkah ini membuka profil atau situs
            resmi outlet yang disebutkan, sebelum hasil akhir ditampilkan.
          </Text>
          <Pressable onPress={onDismissTooltip} style={styles.tooltipBtn}>
            <Text style={styles.tooltipBtnText}>Mengerti</Text>
          </Pressable>
        </View>
      )}

      {/* Simulated outlet profile */}
      <View style={styles.profileCard}>
        <Text style={styles.cardLabel}>Profil sumber</Text>
        <Text style={styles.accountName}>{record.accountName}</Text>
        <Text style={styles.accountType}>{record.accountType}</Text>
        <Text style={styles.profileSummary}>{record.profileSummary}</Text>
        <Text style={styles.profileMeta}>
          Dilihat di {selectedContent.appName}
        </Text>
      </View>

      {/* Corroboration list */}
      <View style={styles.corroborationCard}>
        <Text style={styles.cardLabel}>
          Apakah outlet lain melaporkan hal yang sama?
        </Text>
        {record.corroboration.map((row, i) => (
          <View key={i} style={styles.corroborationRow}>
            <Text style={styles.outletName}>{row.outlet}</Text>
            <Text style={styles.outletStatus}>{row.status}</Text>
          </View>
        ))}
      </View>

      {/* Verdict line (one of four soft labels — never true/false) */}
      <View style={[styles.verdictBox, { backgroundColor: verdict.color }]}>
        <Text style={styles.verdictLabel}>Status sumber</Text>
        <Text style={styles.verdictText}>{verdict.id}</Text>
      </View>

      <Text style={styles.disclaimer}>
        Keputusan akhir tetap di tanganmu. Langkah ini hanya menunjukkan apa
        kata sumbernya sendiri dan media lain.
      </Text>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.secondaryBtn} onPress={onBack}>
          <Text style={styles.secondaryBtnText}>Kembali</Text>
        </Pressable>
        <Pressable style={styles.primaryBtn} onPress={onSeeResult}>
          <Text style={styles.primaryBtnText}>Lihat hasil lengkap</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 0,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  body: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  tooltip: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  tooltipText: {
    color: '#78350F',
    fontSize: 12,
    lineHeight: 18,
  },
  tooltipBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tooltipBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  cardLabel: {
    color: '#1E40AF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  accountName: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  accountType: {
    color: '#1E3A8A',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  profileSummary: {
    color: '#1F2937',
    fontSize: 13,
    lineHeight: 19,
  },
  profileMeta: {
    color: '#475569',
    fontSize: 11,
    marginTop: 8,
  },
  corroborationCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  corroborationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  outletName: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  outletStatus: {
    color: '#4B5563',
    fontSize: 12,
    flex: 1.4,
    textAlign: 'right',
  },
  verdictBox: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  verdictLabel: {
    color: '#fff',
    opacity: 0.85,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  verdictText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  disclaimer: {
    color: '#6B7280',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 14,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  primaryBtn: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

// Grounding note (proposal §5.4): the source-verification layer is the
// signature interaction step that prevents the prototype from acting as a
// "final authority on truth" (Finding 6). The default verdict
// "Sumber belum dikonfirmasi" is preserved as the fallback for any source
// not present in the verification database.
