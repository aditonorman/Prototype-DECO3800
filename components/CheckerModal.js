// CheckerModal
// First pop-up shown when the floating bubble is pressed.
// Confirms the user wants to "check" the currently selected content.
// If the user confirms, it shows the ResultCard (passed in as a prop).
//
// Note: we deliberately do NOT use React Native's <Modal> component here.
// On web, <Modal> renders at the document root and escapes the phone frame.
// Instead we render an absolutely-positioned overlay that stays inside the
// phone screen.

import { View, Text, StyleSheet, Pressable } from 'react-native';
import ResultCard from './ResultCard';
import SourceVerificationModal from './SourceVerificationModal';
import { loc, useLang, useT } from '../LanguageContext';

// Map each content category to its source-question i18n key.
const categoryQuestionKey = {
  health: 'catq.health',
  political: 'catq.political',
  scam: 'catq.scam',
  celebrity: 'catq.celebrity',
  news: 'catq.news',
  lifestyle: 'catq.lifestyle',
  family: 'catq.family',
};

export default function CheckerModal({
  visible,
  selectedContent,
  step, // 'confirm' | 'source' | 'result'
  onCheckSource, // confirm -> source
  onSeeResult, // source -> result
  onBackToConfirm, // source -> confirm
  onClose,
  showSourceTooltip,
  onDismissSourceTooltip,
  interfaceMode = 'self',
}) {
  const isFamilyMode = interfaceMode === 'family';
  const t = useT();
  const lang = useLang();
  // When not visible, render nothing.
  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Dark backdrop — tapping it closes the modal */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.handle} />

        {step === 'confirm' && (
          <View style={{ padding: 20 }}>
            {/* Source-first headline (Finding 5). The first thing the user sees
                is the *source*, not a verdict. */}
            <Text style={[styles.eyebrow, isFamilyMode && styles.eyebrowLg]}>
              {t('modal.eyebrow')}
            </Text>
            <Text style={[styles.title, isFamilyMode && styles.titleLg]}>
              {t('modal.whoPosted')}
            </Text>

            {selectedContent ? (
              <>
                {/* Big source name — most prominent element */}
                <View style={styles.sourceBox}>
                  <Text style={[styles.sourceLabel, isFamilyMode && styles.sourceLabelLg]}>
                    {t('modal.source')}
                  </Text>
                  <Text style={[styles.sourceName, isFamilyMode && styles.sourceNameLg]}>
                    {loc(selectedContent, 'source', lang) || t('common.unknown')}
                  </Text>
                  <Text style={[styles.sourceMeta, isFamilyMode && styles.sourceMetaLg]}>
                    {t('modal.seenOn')} {selectedContent.appName}
                  </Text>
                </View>

                {/* Category-specific source question (Finding 3) */}
                <View style={styles.questionBox}>
                  <Text style={[styles.questionLabel, isFamilyMode && styles.questionLabelLg]}>
                    {t('modal.askYourself')}
                  </Text>
                  <Text style={[styles.questionText, isFamilyMode && styles.questionTextLg]}>
                    {categoryQuestionKey[selectedContent.contentCategory]
                      ? t(categoryQuestionKey[selectedContent.contentCategory])
                      : t('modal.fallbackQuestion')}
                  </Text>
                </View>

                {/* The content itself comes second, not first */}
                <View style={styles.previewBox}>
                  <Text style={[styles.previewLabel, isFamilyMode && styles.previewLabelLg]}>
                    {t('modal.content')}
                  </Text>
                  <Text
                    style={[styles.previewText, isFamilyMode && styles.previewTextLg]}
                    numberOfLines={3}
                  >
                    “{loc(selectedContent, 'preview', lang)}”
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.previewBox}>
                <Text style={[styles.previewLabel, isFamilyMode && styles.previewLabelLg]}>
                  {t('modal.noSelection.title')}
                </Text>
                <Text style={[styles.previewText, isFamilyMode && styles.previewTextLg]}>
                  {t('modal.noSelection.body')}
                </Text>
              </View>
            )}

            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.secondaryBtn, isFamilyMode && styles.btnLg]}
                onPress={onClose}
              >
                <Text style={[styles.secondaryText, isFamilyMode && styles.btnTextLg]}>
                  {t('common.cancel')}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.primaryBtn,
                  isFamilyMode && styles.btnLg,
                  !selectedContent && styles.primaryBtnDisabled,
                ]}
                disabled={!selectedContent}
                onPress={onCheckSource}
              >
                <Text style={[styles.primaryText, isFamilyMode && styles.btnTextLg]}>
                  {t('modal.checkSource')}
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {step === 'source' && (
          <SourceVerificationModal
            selectedContent={selectedContent}
            onSeeResult={onSeeResult}
            onBack={onBackToConfirm}
            showTooltip={showSourceTooltip}
            onDismissTooltip={onDismissSourceTooltip}
            interfaceMode={interfaceMode}
          />
        )}

        {step === 'result' && selectedContent && (
          <ResultCard
            content={selectedContent}
            onClose={onClose}
            interfaceMode={interfaceMode}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Fills the phone screen and stacks above everything else inside the frame.
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 200,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    maxHeight: '85%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 4,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  sourceBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  sourceLabel: {
    color: '#1E40AF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sourceName: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  sourceMeta: {
    color: '#475569',
    fontSize: 11,
    marginTop: 4,
  },
  questionBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  questionLabel: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  questionText: {
    color: '#1F2937',
    fontSize: 14,
    lineHeight: 19,
  },
  previewBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  previewLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  previewText: {
    color: '#111827',
    fontStyle: 'italic',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryText: {
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
  primaryBtnDisabled: {
    backgroundColor: '#93C5FD',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },

  // -----------------------------------------------------------------------
  // Family-mode size overrides — bigger than self mode but conservative
  // enough to fit the 380 px phone frame without clipping.
  // -----------------------------------------------------------------------
  eyebrowLg: { fontSize: 12 },
  titleLg: { fontSize: 23, lineHeight: 28, marginBottom: 14 },

  sourceLabelLg: { fontSize: 12 },
  sourceNameLg: { fontSize: 20, lineHeight: 25 },
  sourceMetaLg: { fontSize: 12, marginTop: 4 },

  questionLabelLg: { fontSize: 12 },
  questionTextLg: { fontSize: 15, lineHeight: 21 },

  previewLabelLg: { fontSize: 12 },
  previewTextLg: { fontSize: 14, lineHeight: 20 },

  btnLg: { paddingVertical: 14, borderRadius: 14 },
  btnTextLg: { fontSize: 16 },
});
