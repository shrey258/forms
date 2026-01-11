import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";

const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A29BFE", "#55EFC4"];

export default function Index() {
  const [index, setIndex] = useState(0);

  const direction = useSharedValue(1);

  const customEntering = (values: any) => {
    "worklet";
    return {
      initialValues: {
        opacity: 0,
        transform: [
          { translateY: direction.value * 100 },
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
          { translateY: withTiming(direction.value * -100, { duration: 300 }) },
          { scale: withTiming(direction.value === 1 ? 0.4 : 1, { duration: 300 }) },
        ],
      },
    };
  };

  const nextWidget = useCallback(() => {
    direction.value = 1;
    setIndex((prev) => (prev + 1) % colors.length);
  }, [direction]);

  const prevWidget = useCallback(() => {
    direction.value = -1;
    setIndex((prev) => (prev - 1 + colors.length) % colors.length);
  }, [direction]);

  const currentColor = colors[index];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F7",
      }}
    >
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Animated.View
          key={`widget-${index}`}
          entering={customEntering}
          exiting={customExiting}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            padding: 10,
            width: "90%",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: currentColor,
            }}
          />
          <View
            style={{
              flex: 1,
              height: 50,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <GlassView
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            />
          </View>
        </Animated.View>
      </View>

      {/* Buttons Section */}
      <View
        style={{
          flexDirection: "row",
          gap: 30,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Pressable
          onPress={prevWidget}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            overflow: "hidden",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
          })}
        >
          <GlassView
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <ArrowLeft color="black" size={24} />
          </GlassView>
        </Pressable>

        <Pressable
          onPress={nextWidget}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            overflow: "hidden",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
          })}
        >
          <GlassView
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <ArrowRight color="black" size={24} />
          </GlassView>
        </Pressable>
      </View>
    </View>
  );
}