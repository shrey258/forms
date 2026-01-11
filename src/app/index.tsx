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
        backgroundColor: "black",
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
            borderRadius: 10,
            overflow:"hidden"
          }}
        >
          <GlassView style={{ flex: 1 }} />
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
        <View style={{ overflow: "hidden", borderRadius: 30 }}>
          <GlassView
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowLeft color="white" size={24} />
          </GlassView>
        </View>
        <View style={{ overflow: "hidden", borderRadius: 30 }}>
          <GlassView
            style={{
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowRight color="white" size={24} />
          </GlassView>
        </View>
      </View>
    </View>
  );
}
