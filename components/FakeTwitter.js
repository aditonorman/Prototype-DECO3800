// FakeTwitter (X)
// A short feed of fake tweets. Tap a tweet to select it for the Checker.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { appLogos, twitterPosts } from '../data/dummyContent';

export default function FakeTwitter({
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
        <View style={styles.centerHeader}>
          <Image
            source={{ uri: appLogos.twitter }}
            style={styles.appLogo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>X</Text>
        </View>
        <Text style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {twitterPosts.map((tweet) => {
          const isSelected = selectedPostId === tweet.id;
          return (
            <Pressable
              key={tweet.id}
              onPress={() => onSelectPost(tweet.id)}
              style={[styles.tweet, isSelected && styles.tweetSelected]}
            >
              <View style={styles.tweetRow}>
                <Text style={styles.avatar}>{tweet.avatar}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.user}>
                    {tweet.user}{' '}
                    <Text style={styles.handle}>{tweet.handle}</Text>
                  </Text>
                  <Text style={styles.tweetText}>{tweet.text}</Text>
                  {tweet.imageUrl && (
                    <Image
                      source={{ uri: tweet.imageUrl }}
                      style={styles.tweetImage}
                      resizeMode="cover"
                    />
                  )}

                  <View style={styles.metaRow}>
                    <Text style={styles.meta}>💬  120</Text>
                    <Text style={styles.meta}>♡ {tweet.likes}</Text>
                    {/* Repost — Finding 2: pause at the moment of sharing. */}
                    <Pressable
                      onPress={(e) => {
                        if (e && e.stopPropagation) e.stopPropagation();
                        if (checkerActive) {
                          onShareAttempt(tweet.id);
                        } else {
                          onSelectPost(tweet.id);
                        }
                      }}
                      style={styles.repostBtn}
                    >
                      <Text style={styles.repostBtnText}>
                        🔁 Repost
                      </Text>
                    </Pressable>
                  </View>

                  <Text
                    style={[
                      styles.tapHint,
                      isSelected && styles.tapHintActive,
                    ]}
                  >
                    {isSelected
                      ? '✓ Selected for Checker'
                      : 'Tap to select for Checker'}
                  </Text>
                </View>
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
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  backBtn: { width: 60 },
  backText: { color: '#fff', fontSize: 14 },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLogo: {
    width: 18,
    height: 18,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginTop: -1,
    marginLeft: 8,
  },
  tweet: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  tweetSelected: {
    backgroundColor: '#0B2545',
  },
  tweetRow: {
    flexDirection: 'row',
  },
  avatar: {
    fontSize: 28,
    marginRight: 10,
  },
  user: {
    color: '#fff',
    fontWeight: '700',
  },
  handle: {
    color: '#6B7280',
    fontWeight: '400',
  },
  tweetText: {
    color: '#E5E7EB',
    marginTop: 4,
    fontSize: 14,
    lineHeight: 19,
  },
  tweetImage: {
    marginTop: 10,
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 30,
  },
  meta: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  repostBtn: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  repostBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  tapHint: {
    marginTop: 8,
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '600',
  },
  tapHintActive: {
    color: '#34D399',
  },
});
