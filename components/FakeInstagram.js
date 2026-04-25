// FakeInstagram
// Dummy Instagram-style feed.
// Each post has a "Check this post" button which selects that post for the Checker.
// The selected post is highlighted so the user knows what the bubble will check.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { instagramPosts } from '../data/dummyContent';

export default function FakeInstagram({
  onBackHome,
  onSelectPost,
  onShareAttempt,
  selectedPostId,
  checkerActive,
}) {
  return (
    <View style={styles.container}>
      {/* App-style top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={onBackHome} style={styles.backBtn}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>
        <Text style={styles.appTitle}>Instagram</Text>
        <Text style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {instagramPosts.map((post) => {
          const isSelected = selectedPostId === post.id;
          return (
            <View
              key={post.id}
              style={[styles.post, isSelected && styles.postSelected]}
            >
              {/* User row */}
              <View style={styles.userRow}>
                <Text style={styles.avatar}>{post.avatar}</Text>
                <Text style={styles.username}>{post.user}</Text>
              </View>

              {/* Big image area (using emoji as a placeholder) */}
              <View style={styles.imageArea}>
                <Text style={styles.bigEmoji}>{post.image}</Text>
              </View>

              {/* Action row — Share button intercepts the share moment */}
              <View style={styles.actionRow}>
                <Text style={styles.action}>♡  💬</Text>
                <Pressable
                  onPress={() =>
                    checkerActive
                      ? onShareAttempt(post.id)
                      : onSelectPost(post.id)
                  }
                  style={styles.shareBtn}
                >
                  <Text style={styles.shareBtnText}>↗ Share</Text>
                </Pressable>
              </View>

              {/* Likes + caption */}
              <Text style={styles.likes}>{post.likes} likes</Text>
              <Text style={styles.caption}>
                <Text style={styles.usernameInline}>{post.user} </Text>
                {post.caption}
              </Text>
              <Text style={styles.commentsHint}>
                View all {post.comments} comments
              </Text>

              {/* Secondary: tap to select for the floating bubble (no share). */}
              <Pressable
                onPress={() => onSelectPost(post.id)}
                style={[
                  styles.checkPostBtn,
                  isSelected && styles.checkPostBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.checkPostText,
                    isSelected && styles.checkPostTextActive,
                  ]}
                >
                  {isSelected
                    ? '✓ Selected for Checker'
                    : 'Tap to select for Checker'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: { width: 60 },
  backText: { color: '#111827', fontSize: 14 },
  appTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#111827',
  },
  post: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  postSelected: {
    backgroundColor: '#EFF6FF',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    fontSize: 24,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    color: '#111827',
  },
  imageArea: {
    height: 220,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigEmoji: {
    fontSize: 90,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  action: { fontSize: 18, letterSpacing: 4 },
  shareBtn: {
    backgroundColor: '#111827',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  shareBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  likes: {
    paddingHorizontal: 12,
    fontWeight: '700',
    color: '#111827',
    fontSize: 13,
  },
  caption: {
    paddingHorizontal: 12,
    color: '#1F2937',
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  usernameInline: {
    fontWeight: '700',
  },
  commentsHint: {
    paddingHorizontal: 12,
    color: '#6B7280',
    fontSize: 12,
    marginTop: 6,
  },
  checkPostBtn: {
    marginTop: 10,
    marginHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2563EB',
    alignItems: 'center',
  },
  checkPostBtnActive: {
    backgroundColor: '#2563EB',
  },
  checkPostText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
  },
  checkPostTextActive: {
    color: '#fff',
  },
});
