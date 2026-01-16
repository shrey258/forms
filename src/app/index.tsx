import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Layout,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";

const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A29BFE", "#55EFC4"];
const colorNames = ["Coral", "Teal", "Sunshine", "Lavender", "Mint"];

export default function Index() {
  const [index, setIndex] = useState(0);

  const direction = useSharedValue(1);

  const customEntering = (values: any) => {
    "worklet";
    return {
      initialValues: {
        opacity: 0,
        transform: [
          { translateY: direction.value * 105 },
          { scale: direction.value === -1 ? 0.4 : 1 },
        ],
      },
      animations: {
        opacity: withTiming(1, { duration: 300 }),
        transform: [
          { translateY: withTiming(0, { duration: 300 }) },
          { scale: withTiming(1, { duration: 300 }) },
        ],
      },
    };
  };

  const customExiting = (values: any) => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateY: 0 }, { scale: 1 }],
      },
      animations: {
        opacity: withDelay(100, withTiming(0, { duration: 200 })),
        transform: [
          { translateY: withTiming(direction.value * -105, { duration: 300 }) },
          {
            scale: withTiming(direction.value === 1 ? 0.4 : 1, {
              duration: 300,
            }),
          },
        ],
      },
    };
  };

  const customCircleEntering = (values: any) => {
    "worklet";
    return {
      initialValues: {
        opacity: 0,
        transform: [
          { translateY: direction.value * 105 },
          { scale: 0.4 },
        ],
      },
      animations: {
        opacity: withTiming(1, { duration: 300 }),
        transform: [
          { translateY: withTiming(0, { duration: 300 }) },
          { scale: withTiming(1, { duration: 300 }) },
        ],
      },
    };
  };

  const customCircleExiting = (values: any) => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateY: 0 }, { scale: 1 }],
      },
      animations: {
        opacity: withTiming(0, { duration: 300 }),
        transform: [
          { translateY: withTiming(direction.value * -105, { duration: 300 }) },
          { scale: withTiming(0.4, { duration: 300 }) },
        ],
      },
    };
  };

  const currentColor = colors[index];
  const currentColorName = colorNames[index];

  const nextWidget = useCallback(() => {
    direction.value = 1;
    setIndex((prev) => (prev + 1) % colors.length);
  }, [direction]);

  const prevWidget = useCallback(() => {
    direction.value = -1;
    setIndex((prev) => (prev - 1 + colors.length) % colors.length);
  }, [direction]);

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
        style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        {/* Overlapping Circles (Progress Trail) */}
        <Animated.View
          layout={Layout.springify()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 50,
            zIndex: 100,
            height: 48, // Fixed height to prevent layout shift when no circles
          }}
        >
          {colors.slice(0, index).map((color, i) => (
            <Animated.View
              key={color}
              entering={customCircleEntering}
              exiting={customCircleExiting}
              layout={Layout.springify()}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: color,
                marginLeft: i === 0 ? 0 : -18,
                borderWidth: 3,
                borderColor: "#F0F2F5",
                shadowColor: color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4,
              }}
            />
          ))}
        </Animated.View>

        {/* Animated Widget */}
        <Animated.View
          key={`widget-${index}`}
          entering={customEntering}
          exiting={customExiting}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            padding: 12,
            paddingHorizontal: 16,
            width: "85%",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.6)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          {/* Color Avatar */}
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: currentColor,
              shadowColor: currentColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 5,
            }}
          />

          {/* Glass Content */}
          <View
            style={{
              flex: 1,
              height: 56,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
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
              >
                {currentColorName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: "#8E8E93",
                }}
              >
                Step {index + 1} of {colors.length}
              </Text>
            </GlassView>
          </View>
        </Animated.View>
      </View>

      {/* Buttons Section */}
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
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
              backgroundColor: index === 0 ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.8)",
              borderWidth: 1,
              borderColor: index === 0 ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.08)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: index === 0 ? 0 : 0.08,
              shadowRadius: 4,
              elevation: index === 0 ? 0 : 2,
            }}
          >
            <ArrowLeft
              color={index === 0 ? "#C7C7CC" : "#1C1C1E"}
              size={22}
            />
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
                index === colors.length - 1
                  ? "rgba(0, 0, 0, 0.05)"
                  : "rgba(255, 255, 255, 0.8)",
              borderWidth: 1,
              borderColor:
                index === colors.length - 1
                  ? "rgba(0, 0, 0, 0.05)"
                  : "rgba(0, 0, 0, 0.08)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: index === colors.length - 1 ? 0 : 0.08,
              shadowRadius: 4,
              elevation: index === colors.length - 1 ? 0 : 2,
            }}
          >
            <ArrowRight
              color={index === colors.length - 1 ? "#C7C7CC" : "#1C1C1E"}
              size={22}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}