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

import { useState } from 'react';
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

import {
  instagramPosts,
  whatsappMessages,
  twitterPosts,
  tiktokPosts,
} from './data/dummyContent';

// The app names that should show the floating bubble.
const SOCIAL_SCREENS = ['instagram', 'whatsapp', 'twitter', 'tiktok'];

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

  // -- Helpers -------------------------------------------------------------

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
  }

  function goHome() {
    setScreen('home');
    setSelectedPostId(null);
  }

  function activateChecker() {
    setCheckerActive(true);
  }

  function openCheckerModal() {
    setModalStep('confirm');
    setModalVisible(true);
  }

  // Finding 2: prompt verification at the moment of sharing.
  // A post's Share button calls this — it both selects the post and opens
  // the checker pop-up in a single tap, so the pause happens at exactly
  // the moment the user is about to share.
  function handleShareAttempt(postId) {
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

  // -- Render --------------------------------------------------------------

  // Decide whether to show the floating bubble.
  const showBubble = checkerActive && SOCIAL_SCREENS.includes(screen);

  // Pick the current screen content.
  let screenContent;
  if (screen === 'lock') {
    screenContent = <LockScreen onUnlock={() => setScreen('home')} />;
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

            {showBubble && (
              <FloatingCheckerBubble onPress={openCheckerModal} />
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
});
