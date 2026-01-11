import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#A29BFE",
  "#55EFC4",
];

export default function Index() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const nextWidget = () => {
    setDirection("up");
    setIndex((prev) => (prev + 1) % colors.length);
  };

  const prevWidget = () => {
    setDirection("down");
    setIndex((prev) => (prev - 1 + colors.length) % colors.length);
  };

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
      {/* Widgets Section */}
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Animated.View
          key={`widget-${index}`}
          entering={
            direction === "up" ? FadeInDown.springify() : FadeInUp.springify()
          }
          exiting={
            direction === "up" ? FadeOutDown.springify() : FadeOutUp.springify()
          }
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
