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

import PhoneFrame from './components/PhoneFrame';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import CheckerApp from './components/CheckerApp';
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

  // Which content (post / message / tweet) is selected to be checked.
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Modal state. step: 'confirm' (first pop-up) or 'result' (after Check).
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
        source: ig.user, // surfaced for the source-first prompt
        preview: ig.caption,
        riskType: ig.riskType,
        contentCategory: ig.contentCategory,
      };
    }

    const wa = whatsappMessages.find((m) => m.id === selectedPostId);
    if (wa) {
      return {
        id: wa.id,
        appName: 'WhatsApp',
        source: wa.forwarded ? `${wa.sender} (forwarded)` : wa.sender,
        preview: wa.text,
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
        preview: tw.text,
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
        preview: tk.caption,
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
  }

  function goHome() {
    setScreen('home');
    setSelectedPostId(null);
    setRecentsVisible(false);
  }

  function activateChecker() {
    setCheckerActive(true);
  }

  function openCheckerModal() {
    setRecentsVisible(false);
    setModalStep('confirm');
    setModalVisible(true);
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

  function confirmCheck() {
    setModalStep('result');
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
  }

  // -- Render --------------------------------------------------------------

  // Decide whether to show the floating bubble.
  const showBubble = checkerActive && SOCIAL_SCREENS.includes(screen);
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
      <HomeScreen onOpenApp={openApp} checkerActive={checkerActive} />
    );
  } else if (screen === 'checker') {
    screenContent = (
      <CheckerApp
        onActivate={activateChecker}
        onBackHome={goHome}
        checkerActive={checkerActive}
      />
    );
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
                bottomOffset={SAMSUNG_FOOTER_HEIGHT + 14}
              />
            )}

            <CheckerModal
              visible={modalVisible}
              selectedContent={getSelectedContent()}
              step={modalStep}
              onConfirm={confirmCheck}
              onClose={closeModal}
            />
          </View>
        </PhoneFrame>
      </View>
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
