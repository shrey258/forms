import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A29BFE", "#55EFC4"];
const colorNames = ["Coral", "Teal", "Sunshine", "Lavender", "Mint"];

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
  mass: 1,
};

export default function Index() {
  const [index, setIndex] = useState(0);

  const nextWidget = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, colors.length - 1));
  }, []);

  const prevWidget = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 600, // Container for the animation play area
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {colors.map((color, i) => (
          <UnifiedWidget
            key={i}
            i={i}
            currentIndex={index}
            color={color}
            name={colorNames[i]}
            total={colors.length}
          />
        ))}
      </View>

      {/* Buttons Section */}
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 100,
        }}
      >
        <Pressable
          onPress={prevWidget}
          disabled={index === 0}
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: index === 0 ? "rgba(0,0,0,0.05)" : "white",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            <ArrowLeft size={24} color={index === 0 ? "#ccc" : "#000"} />
          </View>
        </Pressable>

        <Pressable
          onPress={nextWidget}
          disabled={index === colors.length - 1}
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                index === colors.length - 1 ? "rgba(0,0,0,0.05)" : "white",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            <ArrowRight
              size={24}
              color={index === colors.length - 1 ? "#ccc" : "#000"}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function UnifiedWidget({
  i,
  currentIndex,
  color,
  name,
  total,
}: {
  i: number;
  currentIndex: number;
  color: string;
  name: string;
  total: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const isCurrent = i === currentIndex;
    const isHistory = i < currentIndex;
    const isFuture = i > currentIndex;

    let translateY = 0;
    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 0;

    if (isCurrent) {
      // Active State: Centered, Full Size
      translateY = 0;
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 100;
    } else if (isHistory) {
      // History State: Condensed in Header
      translateY = -220; // Move up to header area
      scale = 0.5; // Shrink to pill size

      const spacing = 35; // Tighter spacing for pure dots
      const historyCount = currentIndex;
      const startX = -((historyCount - 1) * spacing) / 2;
      translateX = startX + (i * spacing);

      opacity = 1;
      zIndex = i; // Order maintains overlap
    } else if (isFuture) {
      // Future State: Waiting below
      translateY = 150;
      scale = 0.8;
      opacity = 0;
      zIndex = -1;
    }

    return {
      transform: [
        { translateX: withSpring(translateX, SPRING_CONFIG) },
        { translateY: withSpring(translateY, SPRING_CONFIG) },
        { scale: withSpring(scale, SPRING_CONFIG) },
      ],
      opacity: withTiming(opacity, { duration: 400 }),
      zIndex,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const isHistory = i < currentIndex;
    return {
      backgroundColor: withTiming(
        isHistory ? "rgba(255,255,255,0)" : "rgba(255, 255, 255, 0.4)",
        { duration: 300 }
      ),
      borderColor: withTiming(
        isHistory ? "rgba(255,255,255,0)" : "rgba(255, 255, 255, 0.6)",
        { duration: 300 }
      ),
      shadowOpacity: withTiming(isHistory ? 0 : 0.1, { duration: 300 }),
      elevation: isHistory ? 0 : 8,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const isHistory = i < currentIndex;
    return {
      opacity: withTiming(isHistory ? 0 : 1, { duration: 300 }),
      maxWidth: withTiming(isHistory ? 0 : 200, { duration: 300 }),
      marginLeft: withTiming(isHistory ? 0 : 16, { duration: 300 }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: width * 0.85, // Fixed width for consistent scaling
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            paddingHorizontal: 16,
            borderRadius: 20,
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 16,
            width: "100%",
          },
          containerAnimatedStyle,
        ]}
      >
        {/* Color Avatar */}
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: color,
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 5,
          }}
        />

        {/* Glass Content */}
        <Animated.View
          style={[
            {
              flex: 1,
              height: 56,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            contentAnimatedStyle,
          ]}
        >
          <GlassView
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#1C1C1E",
                marginBottom: 2,
              }}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "#8E8E93",
              }}
              numberOfLines={1}
            >
              Step {i + 1} of {total}
            </Text>
          </GlassView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}