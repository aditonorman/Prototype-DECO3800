// FloatingCheckerBubble
// Small circular Checker control that floats above social-media screens.
//
// Iteration after usability testing:
//   - Draggable (PanResponder) — participants said the bottom-right placement
//     felt restrictive against dark backgrounds.
//   - Resizable — three preset sizes, cycled via a small "size" chip.
//   - Dismissible — an X close button (revealed on hover / long-press) hides
//     the bubble for the current screen. App.js re-shows it when the user
//     switches to a different app.
//   - Tap (without dragging) still triggers the Checker pop-up.

import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { checkerIcons } from '../data/dummyContent';

// Bubble size presets cycled by the resize control.
const SIZES = {
  small: 48,
  medium: 60,
  large: 76,
};
const SIZE_ORDER = ['small', 'medium', 'large'];

export default function FloatingCheckerBubble({
  onPress,
  onDismiss,
  bottomOffset = 28,
  interfaceMode = 'self',
}) {
  const initialSize = interfaceMode === 'family' ? 'large' : 'medium';
  // Drag position. Held in an Animated.ValueXY so PanResponder can update it
  // smoothly while the user is dragging. The bubble itself is anchored to the
  // bottom-right via `right`/`bottom`; the translation is layered on top.
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Reset the bubble back to its default position whenever the parent
  // unmounts/remounts it (e.g. when switching apps).
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [pan]);

  // Resize state. Defaults to "large" in family mode so the bubble is easier
  // to find and tap for elderly users.
  const [sizeKey, setSizeKey] = useState(initialSize);

  // Hover/long-press reveals the X close + resize chip.
  const [controlsVisible, setControlsVisible] = useState(false);

  // Track whether the current gesture moved enough to count as a drag.
  // We use this to differentiate tap (open Checker) from drag (move bubble).
  const didDragRef = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      // Capture only when the user actually starts moving — leaves taps to
      // the inner Pressable.
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2,
      onPanResponderGrant: () => {
        didDragRef.current = false;
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        didDragRef.current = true;
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const size = SIZES[sizeKey];

  function handleTap() {
    // Suppress the press if the gesture was a drag.
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    onPress();
  }

  function cycleSize(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const idx = SIZE_ORDER.indexOf(sizeKey);
    const next = SIZE_ORDER[(idx + 1) % SIZE_ORDER.length];
    setSizeKey(next);
  }

  function handleDismiss(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    setControlsVisible(false);
    if (onDismiss) onDismiss();
  }

  // While dragging, anchor at top-left so transform offsets read naturally.
  // Otherwise we anchor at bottom-right (the default placement).
  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          right: 16,
          bottom: bottomOffset,
          transform: pan.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={handleTap}
        onLongPress={() => setControlsVisible(true)}
        onHoverIn={() => setControlsVisible(true)}
        onHoverOut={() => setControlsVisible(false)}
        style={[
          styles.bubble,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        {/* LC label */}
        <Text style={[styles.label, sizeKey === 'small' && styles.labelSmall]}>
          LC
        </Text>

        {/* Shield indicator — Checker is active */}
        <Image source={{ uri: checkerIcons.shield }} style={styles.shield} />

        {/* Controls — revealed on hover or after a long-press */}
        {controlsVisible && (
          <>
            <Pressable
              onPress={handleDismiss}
              style={[styles.controlBtn, styles.closeBtn]}
              hitSlop={8}
            >
              <Text style={styles.closeBtnText}>×</Text>
            </Pressable>
            <Pressable
              onPress={cycleSize}
              style={[styles.controlBtn, styles.resizeBtn]}
              hitSlop={8}
            >
              <Text style={styles.resizeBtnText}>⇲</Text>
            </Pressable>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // Sits on top of every screen.
    position: 'absolute',
    zIndex: 100,
  },
  bubble: {
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  labelSmall: {
    fontSize: 13,
  },
  shield: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
  },
  controlBtn: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 4,
  },
  closeBtn: {
    top: -10,
    left: -10,
    backgroundColor: '#DC2626',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  resizeBtn: {
    bottom: -10,
    right: -10,
    backgroundColor: '#111827',
  },
  resizeBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
