# The Fluid Form 🌊
> *Because static forms are boring.*

Most digital forms feel like filing taxes. You fill a box, scroll down, fill another box. It's static, lifeless, and disconnected.

We wanted to build something that felt **alive**. A gradually revealing interface (like Typeform) but with the tactile physics of a deck of cards.

## The Concept: "Conservation of Matter" ⚛️

In traditional apps, the "Progress Dot" in the header and the "Active Question" cards are two different components. 
This breaks the immersion.

In this project, **they are the same object.**

When you answer a question and click "Next", the card doesn't just slide away—it physically **flies up**, **sheds its skin**, and **morphs** into the history dot.

## Technical Deep Dive 🛠️

The secret isn't complex shared-element transitions. It's **Single Component Architecture**.

We don't use two separate lists. We render a single list of `UnifiedWidget` components. Each widget uses `react-native-reanimated` to determine its physics state based on its index:

```tsx
// 1. ACTIVE STATE (The Question) �
// Centered, Full Scale, Glass effect active
if (isCurrent) {
  translateY = 0;
  scale = 1;
  opacity = 1;
}

// 2. HISTORY STATE (The Dot) ●
// Moves deep into the header (-220px), shrinks (0.5x)
else if (isHistory) {
  translateY = -220; 
  scale = 0.5;
  // Dynamically calculated X position to form the row
  translateX = calculateHeaderPosition(i);
}

// 3. FUTURE STATE (The Deck) 🃏
// Waiting below the viewport, ready to spring up
else if (isFuture) {
  translateY = 150;
  scale = 0.8;
  opacity = 0;
}
```

### The "Shedding" Visual Trick 🐍

How does a complex Glass Card turn into a simple colored dot?

We structured the component in two independent layers:
1.  **The Glass Pill** (Container): The frosted background and white border.
2.  **The Core** (Content): The Colored Avatar and Text.

When a card becomes history, we don't just shrink it. We explicitly **fade out the Glass Shell**:

```tsx
const containerStyle = useAnimatedStyle(() => {
  return {
    // Fade the glass shell to 0 opacity
    backgroundColor: withTiming(isHistory ? "transparent" : "rgba(255,255,255,0.4)"),
    borderColor: withTiming(isHistory ? "transparent" : "rgba(255,255,255,0.6)"),
    // Remove shadows so it becomes flat
    elevation: isHistory ? 0 : 8,
  };
});
```

Because the **Color Avatar** never fades, your eye tracks that specific splash of color as it travels up the screen. The heavy card visually "sheds" its weight to become a light progress marker.

## The Stack 📚
- **React Native Reanimated**: For the 120fps spring physics (`damping: 15`, `stiffness: 120`).
- **Expo Glass Effect**: For that premium frosted look.
- **Lucide Icons**: Clean, crisp vectors.

## Run It 🏃‍♂️

```bash
npm install
npx expo start
```
