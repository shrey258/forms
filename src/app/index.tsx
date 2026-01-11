import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const widgets = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#A29BFE",
  "#55EFC4",
].map((color, index) => (
  <Animated.View
    key={`widget-${index}`}
    entering={FadeInDown.springify()}
    exiting={FadeOutUp.springify()}
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
        backgroundColor: color,
      }}
    />
    <View
      style={{
        flex: 1,
        height: 50,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <GlassView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.03)" }} />
    </View>
  </Animated.View>
));


import { useState } from "react";

export default function Index() {
  const [index, setIndex] = useState(0);

  const nextWidget = () => {
    setIndex((prev) => (prev + 1) % widgets.length);
  };

  const prevWidget = () => {
    setIndex((prev) => (prev - 1 + widgets.length) % widgets.length);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Widgets Section */}
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        {widgets[index]}
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
