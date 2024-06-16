import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {Link} from "expo-router"
export default function Index() {
  return (
    <View className="flex-1 bg-slate-900 gap-3 items-center justify-center">
      <StatusBar style="auto" />
      <Text className="text-3xl text-white">Sarva</Text>
      <Text className="text-xl text-white">omnipresent payments app</Text>
      <Link href="/dashboard" className="text-white">Go to Dashboard</Link>
    </View>
  );
}
