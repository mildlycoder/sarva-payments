import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const onHandlePress = () => {
    router.replace("/sign-in")
  };
  return (
    <SafeAreaView className="bg-green-600 gap-2 items-between justify-between">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full flex items-center justify-center">
          <StatusBar style="auto" />
          <Image source={require("../assets/icon.png")} />
          <Text className="text-3xl font-space text-white">Sarva</Text>
          <Text className="text-xl font-space text-white">
            omnipresent payments app
          </Text>
          <TouchableOpacity
            onPress={onHandlePress}
            className="bg-orange-500 m-5 px-4 py-2 rounded-md"
          >
            <Text className="text-white">Continue with Private key</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
