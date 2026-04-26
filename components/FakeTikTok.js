// FakeTikTok
// Full-screen vertical pager to better match TikTok's interaction model.
// Tapping a page selects the current video for the Checker.

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import { appLogos, tiktokPosts, uiIcons } from '../data/dummyContent';

export default function FakeTikTok({
  onBackHome,
  onSelectPost,
  onShareAttempt,
  selectedPostId,
  checkerActive,
}) {
  const [pageHeight, setPageHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const feedData = useMemo(() => tiktokPosts, []);

  function handleSnapEnd(event) {
    if (!pageHeight) return;
    const offsetY = event.nativeEvent.contentOffset.y;
    const nextIndex = Math.round(offsetY / pageHeight);
    setActiveIndex(nextIndex);
  }

  function getSongLabel(video, index) {
    const songs = [
      'Original sound - wellness_daily_id',
      'News mix - civic updates',
      'Trending beat - hot takes',
    ];
    return songs[index % songs.length];
  }

  function renderVideo({ item, index }) {
    const isSelected = selectedPostId === item.id;

    return (
      <Pressable
        onPress={() => onSelectPost(item.id)}
        style={[styles.page, { height: pageHeight || 1 }]}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.videoImage} />
        <View style={styles.darkOverlay} />

        <View style={styles.bottomOverlay}>
          <View style={styles.metaColumn}>
            <View style={styles.userRow}>
              <Image source={{ uri: item.avatarUrl }} style={styles.inlineAvatar} />
              <Text style={styles.userLine}>
                @{item.user} <Text style={styles.followText}>Follow</Text>
              </Text>
            </View>
            <Text style={styles.caption}>{item.caption}</Text>
            <View style={styles.audioRow}>
              <Image source={{ uri: uiIcons.dark.music }} style={styles.audioIcon} />
              <Text style={styles.audioLine}>{getSongLabel(item, index)}</Text>
            </View>
            <Text style={[styles.selectHint, isSelected && styles.selectHintActive]}>
              {isSelected
                ? '✓ Selected for Legitimate Checker'
                : 'Tap video to select for Legitimate Checker'}
            </Text>
          </View>

          <View style={styles.actionRail}>
            <View style={styles.profileChip}>
              <Image source={{ uri: item.avatarUrl }} style={styles.profileImage} />
            </View>

            <View style={styles.railItem}>
              <Image source={{ uri: uiIcons.dark.like }} style={styles.railIcon} />
              <Text style={styles.railLabel}>{item.likes}</Text>
            </View>

            <View style={styles.railItem}>
              <Image source={{ uri: uiIcons.dark.comment }} style={styles.railIcon} />
              <Text style={styles.railLabel}>{item.comments}</Text>
            </View>

            <View style={styles.railItem}>
              <Image source={{ uri: uiIcons.dark.save }} style={styles.railIcon} />
              <Text style={styles.railLabel}>Save</Text>
            </View>

            <Pressable
              onPress={(e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                if (checkerActive) {
                  onShareAttempt(item.id);
                } else {
                  onSelectPost(item.id);
                }
              }}
              style={styles.shareRailBtn}
            >
              <Image source={{ uri: uiIcons.dark.share }} style={styles.shareIcon} />
              <Text style={styles.railLabel}>Share</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const nextHeight = Math.floor(event.nativeEvent.layout.height);
        if (nextHeight !== pageHeight) {
          setPageHeight(nextHeight);
        }
      }}
    >
      {pageHeight > 0 && (
        <FlatList
          data={feedData}
          keyExtractor={(item) => item.id}
          renderItem={renderVideo}
          pagingEnabled
          snapToInterval={pageHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleSnapEnd}
          getItemLayout={(_, index) => ({
            length: pageHeight,
            offset: pageHeight * index,
            index,
          })}
          initialNumToRender={2}
          windowSize={3}
        />
      )}

      <View style={styles.headerOverlay} pointerEvents="box-none">
        <Pressable style={styles.backPill} onPress={onBackHome}>
          <Text style={styles.backText}>← Home</Text>
        </Pressable>

        <View style={styles.topCenter}>
          <Image
            source={{ uri: appLogos.tiktok }}
            style={styles.topLogo}
            resizeMode="contain"
          />
          <Text style={styles.topTabMuted}>Following</Text>
          <Text style={styles.topTabActive}>For You</Text>
        </View>

        <Text style={styles.indexText}>
          {feedData.length ? `${activeIndex + 1}/${feedData.length}` : '0/0'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  page: {
    width: '100%',
    backgroundColor: '#000',
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 44,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backPill: {
    backgroundColor: 'rgba(0,0,0,0.46)',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  topCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  topLogo: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  topTabMuted: {
    color: '#D1D5DB',
    fontSize: 12,
    marginRight: 8,
  },
  topTabActive: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  indexText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.46)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 76,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaColumn: {
    flex: 1,
    paddingRight: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
  },
  userLine: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  followText: {
    color: '#F87171',
    fontWeight: '700',
  },
  caption: {
    color: '#fff',
    marginTop: 6,
    fontSize: 14,
    lineHeight: 19,
  },
  audioRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  audioLine: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  selectHint: {
    color: '#93C5FD',
    marginTop: 8,
    fontWeight: '700',
    fontSize: 12,
  },
  selectHintActive: {
    color: '#86EFAC',
  },
  actionRail: {
    alignItems: 'center',
    width: 76,
  },
  profileChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  railItem: {
    alignItems: 'center',
    marginBottom: 12,
  },
  railIcon: {
    width: 20,
    height: 20,
  },
  railLabel: {
    color: '#fff',
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
  },
  shareRailBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(37,99,235,0.88)',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  shareIcon: {
    width: 18,
    height: 18,
  },
});
