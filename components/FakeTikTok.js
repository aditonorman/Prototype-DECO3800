// FakeTikTok
// A vertical feed of short-video style cards.
// Tapping a card selects it for the Checker.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { appLogos, tiktokPosts } from '../data/dummyContent';

export default function FakeTikTok({
  onBackHome,
  onSelectPost,
  onShareAttempt,
  selectedPostId,
  checkerActive,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBackHome} style={styles.backBtn}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>
        <View style={styles.centerHeader}>
          <Image
            source={{ uri: appLogos.tiktok }}
            style={styles.appLogo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>TikTok</Text>
        </View>
        <Text style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 90 }}>
        {tiktokPosts.map((video) => {
          const isSelected = selectedPostId === video.id;
          return (
            <Pressable
              key={video.id}
              onPress={() => onSelectPost(video.id)}
              style={[styles.videoCard, isSelected && styles.videoCardSelected]}
            >
              <Image
                source={{ uri: video.imageUrl }}
                style={styles.videoImage}
                resizeMode="cover"
              />
              <View style={styles.darkOverlay} />

              <View style={styles.videoContent}>
                <View>
                  <Text style={styles.userLine}>
                    {video.avatar} {video.user}{' '}
                    <Text style={styles.handle}>{video.handle}</Text>
                  </Text>
                  <Text style={styles.caption}>{video.caption}</Text>
                </View>

                <View>
                  <View style={styles.statRow}>
                    <Text style={styles.stat}>❤️ {video.likes}</Text>
                    <Text style={styles.stat}>💬 {video.comments}</Text>
                    <Text style={styles.stat}>↗ {video.shares}</Text>
                  </View>
                  <View style={styles.actionRow}>
                    <Text
                      style={[
                        styles.tapHint,
                        isSelected && styles.tapHintSelected,
                      ]}
                    >
                      {isSelected
                        ? '✓ Selected for Checker'
                        : 'Tap to select for Checker'}
                    </Text>
                    <Pressable
                      onPress={(e) => {
                        if (e && e.stopPropagation) e.stopPropagation();
                        if (checkerActive) {
                          onShareAttempt(video.id);
                        } else {
                          onSelectPost(video.id);
                        }
                      }}
                      style={styles.shareBtn}
                    >
                      <Text style={styles.shareBtnText}>↗ Share</Text>
                    </Pressable>
                  </View>
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
    backgroundColor: '#000',
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },
  videoCard: {
    height: 440,
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  videoCardSelected: {
    borderColor: '#60A5FA',
    borderWidth: 2,
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  videoContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    justifyContent: 'space-between',
  },
  userLine: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  handle: {
    color: '#E5E7EB',
    fontWeight: '500',
  },
  caption: {
    color: '#F3F4F6',
    marginTop: 6,
    lineHeight: 20,
    fontSize: 14,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tapHint: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  tapHintSelected: {
    color: '#86EFAC',
  },
  shareBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  shareBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
