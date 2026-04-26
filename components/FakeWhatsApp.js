// FakeWhatsApp
// Fake "Family Group" chat. Includes one suspicious forwarded message.
// Each non-mine message is tappable so it can be selected for the Checker.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { appLogos, uiIcons, whatsappMessages } from '../data/dummyContent';

export default function FakeWhatsApp({
  onBackHome,
  onSelectPost,
  onShareAttempt,
  selectedPostId,
  checkerActive,
}) {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={onBackHome} style={styles.backBtn}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <View style={styles.groupTitleRow}>
            <Image
              source={{ uri: appLogos.whatsapp }}
              style={styles.appLogo}
              resizeMode="contain"
            />
            <Text style={styles.groupName}>Family Group</Text>
          </View>
          <Text style={styles.groupSub}>Mom, Dad, Sister, Uncle Budi, You</Text>
        </View>
      </View>

      {/* Chat scroll */}
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={{ paddingVertical: 14, paddingBottom: 90 }}
      >
        {whatsappMessages.map((msg) => {
          const isMine = msg.isMine;
          const isSelected = selectedPostId === msg.id;

          return (
            <Pressable
              key={msg.id}
              onPress={() => !isMine && onSelectPost(msg.id)}
              style={[
                styles.bubbleRow,
                isMine ? styles.rowRight : styles.rowLeft,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isMine ? styles.bubbleMine : styles.bubbleOther,
                  isSelected && styles.bubbleSelected,
                ]}
              >
                {!isMine && (
                  <View style={styles.senderRow}>
                    <Image
                      source={{ uri: msg.avatarUrl }}
                      style={styles.senderAvatar}
                    />
                    <Text style={styles.sender}>{msg.sender}</Text>
                  </View>
                )}

                {msg.forwarded && (
                  <View style={styles.forwardedRow}>
                    <Image
                      source={{ uri: uiIcons.light.forward }}
                      style={styles.forwardedIcon}
                    />
                    <Text style={styles.forwarded}>Forwarded many times</Text>
                  </View>
                )}

                <Text style={styles.bubbleText}>{msg.text}</Text>
                <Text style={styles.time}>{msg.time}</Text>

                {!isMine && (
                  <View style={styles.bubbleActions}>
                    <Text style={styles.tapHint}>
                      {isSelected ? '✓ Selected' : 'Tap to select'}
                    </Text>
                    {/* Forward button — Finding 2: pause at the moment of sharing. */}
                    <Pressable
                      onPress={(e) => {
                        // Stop the parent Pressable from also firing select.
                        if (e && e.stopPropagation) e.stopPropagation();
                        if (checkerActive) {
                          onShareAttempt(msg.id);
                        } else {
                          onSelectPost(msg.id);
                        }
                      }}
                      style={styles.forwardBtn}
                    >
                      <Image
                        source={{ uri: uiIcons.dark.forward }}
                        style={styles.forwardBtnIcon}
                      />
                      <Text style={styles.forwardBtnText}>Forward</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD', // classic WhatsApp wallpaper colour.
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: '#075E54',
  },
  backBtn: { width: 60 },
  backText: { color: '#fff', fontSize: 14 },
  groupName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 6,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLogo: {
    width: 16,
    height: 16,
  },
  groupSub: {
    color: '#D1FAE5',
    fontSize: 11,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bubbleRow: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
  },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '82%',
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
  },
  bubbleMine: {
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },
  bubbleSelected: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  senderAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
    backgroundColor: '#D1D5DB',
  },
  sender: {
    fontWeight: '700',
    color: '#075E54',
    fontSize: 12,
  },
  forwardedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  forwardedIcon: {
    width: 11,
    height: 11,
    marginRight: 4,
    opacity: 0.8,
  },
  forwarded: {
    color: '#6B7280',
    fontSize: 11,
    fontStyle: 'italic',
  },
  bubbleText: {
    color: '#111827',
    fontSize: 14,
    lineHeight: 19,
  },
  time: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  bubbleActions: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tapHint: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '600',
  },
  forwardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  forwardBtnIcon: {
    width: 10,
    height: 10,
    marginRight: 4,
  },
  forwardBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
