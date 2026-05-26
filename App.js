// App.js
// Main entry point for the Legitimate Checker prototype.
//
// We do not use React Navigation here on purpose — the prototype only has a
// few screens, and managing them with simple useState is easier to read for
// non-CS students.
//
// Flow:
//   lock -> home -> (instagram | whatsapp | twitter | tiktok | checker)
//   The floating checker bubble appears on social-media screens once activated.
//   Tapping the bubble opens a confirmation modal, then a result modal.

import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageContext } from './LanguageContext';
import PhoneFrame from './components/PhoneFrame';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import CheckerApp from './components/CheckerApp';
import OnboardingEntry from './components/OnboardingEntry';
import SoloOnboarding from './components/SoloOnboarding';
import FakeInstagram from './components/FakeInstagram';
import FakeWhatsApp from './components/FakeWhatsApp';
import FakeTwitter from './components/FakeTwitter';
import FakeTikTok from './components/FakeTikTok';
import FloatingCheckerBubble from './components/FloatingCheckerBubble';
import CheckerModal from './components/CheckerModal';
import OpenTabsSheet from './components/OpenTabsSheet';
import SamsungFooter, {
  SAMSUNG_FOOTER_HEIGHT,
} from './components/SamsungFooter';

import {
  appLogos,
  instagramPosts,
  whatsappMessages,
  twitterPosts,
  tiktokPosts,
} from './data/dummyContent';

// The app names that should show the floating bubble.
const SOCIAL_SCREENS = ['instagram', 'whatsapp', 'twitter', 'tiktok'];

// Screens that should appear in the "Open Tabs" recent-apps panel.
const TAB_META = {
  instagram: { label: 'Instagram', logoUri: appLogos.instagram },
  whatsapp: { label: 'WhatsApp', logoUri: appLogos.whatsapp },
  twitter: { label: 'X', logoUri: appLogos.twitter },
  tiktok: { label: 'TikTok', logoUri: appLogos.tiktok },
  checker: { label: 'Checker', logoUri: null },
};

export default function App() {
  // Which screen is currently visible inside the fake phone.
  const [screen, setScreen] = useState('lock');

  // Whether the user has activated the Checker.
  const [checkerActive, setCheckerActive] = useState(false);

  // Which screens the user has temporarily dismissed the floating bubble on.
  // Bubble is re-shown when they move to a different social-media screen
  // (usability testing finding: bubble should be dismissible without
  // permanently disabling it).
  const [dismissedOn, setDismissedOn] = useState({});

  // Display language. Defaults to Bahasa Indonesia; English is for tutors
  // and reviewers who don't read Indonesian. Toggled from the home screen.
  const [language, setLanguage] = useState('id');

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  }

  // Which onboarding flow the user is in (proposal §5.2.1–§5.2.3).
  //   'unset'    — first time, show the OnboardingEntry chooser.
  //   'assisted' — State A, existing CheckerApp flow.
  //   'solo'     — State B, SoloOnboarding flow.
  const [onboardingPath, setOnboardingPath] = useState('unset');

  // Visual mode picked at onboarding. Drives a separate "big, simpler"
  // interface for elderly users so we never have to ask "who is this for?"
  // again after the entry chooser.
  //   'self'   — standard interface for digitally-literate users.
  //   'family' — large fonts, bigger buttons, simpler layouts for elderly users.
  const [interfaceMode, setInterfaceMode] = useState('self');

  // One-time tooltip explaining the source-verification step. Shown the first
  // time a solo-onboarded user reaches the source step.
  const [sourceTooltipShown, setSourceTooltipShown] = useState(false);

  // Which content (post / message / tweet) is selected to be checked.
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Modal state.
  //   step: 'confirm' | 'source' | 'result'
  //   'source' is the new source-verification layer (proposal §5.4).
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState('confirm');
  const [recentsVisible, setRecentsVisible] = useState(false);

  // Keep a small recency list for the Samsung Recents button.
  const [recentTabs, setRecentTabs] = useState([]);

  // -- Helpers -------------------------------------------------------------

  function rememberTab(screenName) {
    if (!TAB_META[screenName]) return;
    setRecentTabs((prev) => {
      const next = [screenName, ...prev.filter((item) => item !== screenName)];
      return next.slice(0, 5);
    });
  }

  // Look up the selected content across all dummy data sources.
  // Returns a normalised object the modal can read, or null if nothing chosen.
  function getSelectedContent() {
    if (!selectedPostId) return null;

    const ig = instagramPosts.find((p) => p.id === selectedPostId);
    if (ig) {
      return {
        id: ig.id,
        appName: 'Instagram',
        // The Indonesian-keyed `source` is still used to look up the
        // verification DB; `source_en` is only for display.
        source: ig.user,
        source_en: ig.user, // handles aren't translated
        preview: ig.caption,
        preview_en: ig.caption_en,
        riskType: ig.riskType,
        contentCategory: ig.contentCategory,
      };
    }

    const wa = whatsappMessages.find((m) => m.id === selectedPostId);
    if (wa) {
      return {
        id: wa.id,
        appName: 'WhatsApp',
        source: wa.forwarded ? `${wa.sender} (diteruskan)` : wa.sender,
        source_en: wa.forwarded
          ? `${wa.sender_en || wa.sender} (forwarded)`
          : wa.sender_en || wa.sender,
        preview: wa.text,
        preview_en: wa.text_en,
        riskType: wa.riskType,
        contentCategory: wa.contentCategory,
      };
    }

    const tw = twitterPosts.find((t) => t.id === selectedPostId);
    if (tw) {
      return {
        id: tw.id,
        appName: 'X / Twitter',
        source: `${tw.user} ${tw.handle}`,
        source_en: `${tw.user} ${tw.handle}`,
        preview: tw.text,
        preview_en: tw.text_en,
        riskType: tw.riskType,
        contentCategory: tw.contentCategory,
      };
    }

    const tk = tiktokPosts.find((t) => t.id === selectedPostId);
    if (tk) {
      return {
        id: tk.id,
        appName: 'TikTok',
        source: `${tk.user} ${tk.handle}`,
        source_en: `${tk.user} ${tk.handle}`,
        preview: tk.caption,
        preview_en: tk.caption_en,
        riskType: tk.riskType,
        contentCategory: tk.contentCategory,
      };
    }

    return null;
  }

  // -- Handlers ------------------------------------------------------------

  function openApp(appName) {
    // Reset selected post when changing apps so old selections do not leak.
    setSelectedPostId(null);
    setScreen(appName);
    rememberTab(appName);
    setRecentsVisible(false);
    // Bubble dismissal clears on navigation, so the bubble reappears.
    setDismissedOn({});
  }

  function goHome() {
    setScreen('home');
    setSelectedPostId(null);
    setRecentsVisible(false);
    setDismissedOn({});
    // If the user left the onboarding without activating the Checker, reset
    // the path so the next visit starts fresh at the entry chooser instead
    // of dropping them back into the same half-completed flow.
    if (!checkerActive) {
      setOnboardingPath('unset');
    }
  }

  function activateChecker() {
    setCheckerActive(true);
  }

  // Onboarding path handlers — picked from the entry chooser.
  // The mode argument is the visible interface mode that will follow.
  function pickAssistedOnboarding(mode = 'self') {
    setInterfaceMode(mode);
    setOnboardingPath('assisted');
  }

  function pickSoloOnboarding(mode = 'family') {
    setInterfaceMode(mode);
    setOnboardingPath('solo');
  }

  function activateAndGoHome() {
    activateChecker();
    goHome();
  }

  function openCheckerModal() {
    setRecentsVisible(false);
    setModalStep('confirm');
    setModalVisible(true);
  }

  // Bubble X-button — hide bubble until the user moves to a different screen.
  function dismissBubble() {
    setDismissedOn((prev) => ({ ...prev, [screen]: true }));
  }

  // Finding 2: prompt verification at the moment of sharing.
  // A post's Share button calls this — it both selects the post and opens
  // the checker pop-up in a single tap, so the pause happens at exactly
  // the moment the user is about to share.
  function handleShareAttempt(postId) {
    setRecentsVisible(false);
    setSelectedPostId(postId);
    setModalStep('confirm');
    setModalVisible(true);
  }

  // Step transitions for the Checker modal (proposal §5.4).
  function goToSourceStep() {
    setModalStep('source');
  }

  function goToResultStep() {
    setModalStep('result');
  }

  function goBackToConfirmStep() {
    setModalStep('confirm');
  }

  function dismissSourceTooltip() {
    setSourceTooltipShown(true);
  }

  function closeModal() {
    setModalVisible(false);
    // After a small delay would be nicer, but this keeps the prototype simple.
    setModalStep('confirm');
  }

  function handleSamsungRecents() {
    // Keep Recents focused; if checker modal is open, close it first.
    if (modalVisible) {
      closeModal();
    }
    setRecentsVisible((prev) => !prev);
  }

  function handleSamsungHome() {
    if (modalVisible) closeModal();
    setRecentsVisible(false);
    if (screen !== 'home') {
      goHome();
    }
  }

  function handleSamsungBack() {
    if (modalVisible) {
      closeModal();
      return;
    }

    if (recentsVisible) {
      setRecentsVisible(false);
      return;
    }

    // Prototype back behaviour: app screens return to home.
    if (screen !== 'home' && screen !== 'lock') {
      goHome();
    }
  }

  function openRecentTab(tabKey) {
    if (!TAB_META[tabKey]) {
      setRecentsVisible(false);
      return;
    }

    setScreen(tabKey);
    setSelectedPostId(null);
    rememberTab(tabKey);
    setRecentsVisible(false);
    setDismissedOn({});
  }

  // -- Render --------------------------------------------------------------

  // Decide whether to show the floating bubble. Hidden while temporarily
  // dismissed on the current screen.
  const showBubble =
    checkerActive && SOCIAL_SCREENS.includes(screen) && !dismissedOn[screen];
  const tabItems = useMemo(
    () => recentTabs.filter((tab) => TAB_META[tab]).map((tab) => ({
      key: tab,
      label: TAB_META[tab].label,
      logoUri: TAB_META[tab].logoUri,
    })),
    [recentTabs]
  );

  // Pick the current screen content.
  let screenContent;
  if (screen === 'lock') {
    screenContent = (
      <LockScreen
        onUnlock={() => {
          setScreen('home');
          setRecentsVisible(false);
        }}
      />
    );
  } else if (screen === 'home') {
    screenContent = (
      <HomeScreen
        onOpenApp={openApp}
        checkerActive={checkerActive}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
    );
  } else if (screen === 'checker') {
    // Route through onboarding entry on first visit (proposal §5.2.1–§5.2.3).
    if (!checkerActive && onboardingPath === 'unset') {
      screenContent = (
        <OnboardingEntry
          onPickAssisted={pickAssistedOnboarding}
          onPickSolo={pickSoloOnboarding}
          onBackHome={goHome}
        />
      );
    } else if (!checkerActive && onboardingPath === 'solo') {
      screenContent = (
        <SoloOnboarding
          onActivate={activateAndGoHome}
          onBackHome={goHome}
        />
      );
    } else {
      screenContent = (
        <CheckerApp
          onActivate={activateChecker}
          onBackHome={goHome}
          checkerActive={checkerActive}
          interfaceMode={interfaceMode}
        />
      );
    }
  } else if (screen === 'instagram') {
    screenContent = (
      <FakeInstagram
        onBackHome={goHome}
        onSelectPost={setSelectedPostId}
        onShareAttempt={handleShareAttempt}
        selectedPostId={selectedPostId}
        checkerActive={checkerActive}
      />
    );
  } else if (screen === 'whatsapp') {
    screenContent = (
      <FakeWhatsApp
        onBackHome={goHome}
        onSelectPost={setSelectedPostId}
        onShareAttempt={handleShareAttempt}
        selectedPostId={selectedPostId}
        checkerActive={checkerActive}
      />
    );
  } else if (screen === 'twitter') {
    screenContent = (
      <FakeTwitter
        onBackHome={goHome}
        onSelectPost={setSelectedPostId}
        onShareAttempt={handleShareAttempt}
        selectedPostId={selectedPostId}
        checkerActive={checkerActive}
      />
    );
  } else if (screen === 'tiktok') {
    screenContent = (
      <FakeTikTok
        onBackHome={goHome}
        onSelectPost={setSelectedPostId}
        onShareAttempt={handleShareAttempt}
        selectedPostId={selectedPostId}
        checkerActive={checkerActive}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <LanguageContext.Provider value={language}>
      <View style={styles.root}>
        <StatusBar style="light" hidden />
        <PhoneFrame>
          {/* Inside the phone frame: the active screen + (optional) bubble + (optional) modal */}
          <View style={styles.phoneInner}>
            {screenContent}

            <OpenTabsSheet
              visible={recentsVisible}
              tabs={tabItems}
              currentScreen={screen}
              onClose={() => setRecentsVisible(false)}
              onOpenTab={openRecentTab}
              bottomInset={SAMSUNG_FOOTER_HEIGHT}
            />

            <View style={styles.footerWrap}>
              <SamsungFooter
                onRecents={handleSamsungRecents}
                onHome={handleSamsungHome}
                onBack={handleSamsungBack}
              />
            </View>

            {showBubble && (
              <FloatingCheckerBubble
                onPress={openCheckerModal}
                onDismiss={dismissBubble}
                bottomOffset={SAMSUNG_FOOTER_HEIGHT + 14}
                interfaceMode={interfaceMode}
              />
            )}

            <CheckerModal
              visible={modalVisible}
              selectedContent={getSelectedContent()}
              step={modalStep}
              onCheckSource={goToSourceStep}
              onSeeResult={goToResultStep}
              onBackToConfirm={goBackToConfirmStep}
              onClose={closeModal}
              interfaceMode={interfaceMode}
              showSourceTooltip={
                onboardingPath === 'solo' && !sourceTooltipShown
              }
              onDismissSourceTooltip={dismissSourceTooltip}
            />
          </View>
        </PhoneFrame>
      </View>
      </LanguageContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#111827',
  },
  phoneInner: {
    flex: 1,
    position: 'relative',
  },
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 130,
  },
});
