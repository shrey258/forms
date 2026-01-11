import { GlassView } from "expo-glass-effect";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";




export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Animated.View
        entering={FadeInDown.springify()}
        exiting={FadeOutUp.springify()}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: "red",
          }}
        />
        <View
          style={{
            flex: 1,
            height: 50,
            borderRadius: 15,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <GlassView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.05)" }} />
        </View>
      </Animated.View>

      <View
        style={{
          flex: -1,
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <View style={{ overflow: "hidden", borderRadius: 30, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.1)" }}>
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
        </View>
        <View style={{ overflow: "hidden", borderRadius: 30, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.1)" }}>
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
        </View>
      </View>
    </View>
  );
}
