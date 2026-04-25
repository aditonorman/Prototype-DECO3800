// OpenTabsSheet
// Small "recent apps" panel opened from the Samsung footer.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

export default function OpenTabsSheet({
  visible,
  tabs,
  currentScreen,
  onClose,
  onOpenTab,
  bottomInset = 0,
}) {
  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={[styles.sheet, { marginBottom: bottomInset }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Open Tabs</Text>

        {tabs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No recent apps yet. Open Instagram, WhatsApp, X, TikTok, or Checker.
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
          >
            {tabs.map((tab) => {
              const isActive = tab.key === currentScreen;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => onOpenTab(tab.key)}
                  style={[styles.tabCard, isActive && styles.tabCardActive]}
                >
                  {tab.logoUri ? (
                    <Image
                      source={{ uri: tab.logoUri }}
                      style={styles.tabLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.checkerLogo}>
                      <Text style={styles.checkerLogoText}>LC</Text>
                    </View>
                  )}

                  <Text style={styles.tabLabel} numberOfLines={1}>
                    {tab.label}
                  </Text>
                  <Text style={styles.tabSub}>
                    {isActive ? 'Current app' : 'Tap to open'}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 170,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  sheet: {
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 8,
    paddingBottom: 18,
    minHeight: 180,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  handle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginBottom: 8,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  emptyState: {
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  emptyText: {
    color: '#4B5563',
    fontSize: 13,
    lineHeight: 18,
  },
  tabsRow: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 2,
  },
  tabCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  tabCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  tabLogo: {
    width: 22,
    height: 22,
    marginBottom: 10,
  },
  checkerLogo: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkerLogoText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  tabLabel: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
  },
  tabSub: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 4,
  },
});
