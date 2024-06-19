import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCredStore } from "../store/credStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
const dashboard = () => {
  const publicAddr = useCredStore((state: any) => state.publicAddress);
  const publicAddress = `${publicAddr.slice(0, 6)}...${publicAddr.slice(36, 42)}`;
  const logout = async () => {
    await AsyncStorage.setItem("my-key", "");
    router.push("/");
  };

  useEffect(() => {
    if (!publicAddr) router.push("/");
  }, []);
  return (
    <SafeAreaView className="bg-rose-400">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-row w-[95%] mx-auto items-center justify-between p-2">
          <View className="bg-white rounded-full">
            <Text className="text-lg align-center align-center flex items-center justify-center px-4 py-2 truncate">
              S
            </Text>
          </View>
          <Text className="text-lg flex items-center justify-center ml-2 truncate font-space">
            {publicAddress}
          </Text>

          <View>
            <TouchableOpacity
              onPress={logout}
              className="bg-white/70 p-3 flex items-center justify-center rounded-[100px] aspect-square"
            >
              <Image
                className="h-5 w-5"
                source={require("../../assets/icons/logout.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex items-start  justify-center p-2">
          <Text className="text-left w-[90%] mx-auto text-white font-bspace text-3xl px-2 my-4">
            Account
          </Text>
          <View className=" w-[90%] mx-auto bg-white rounded-[30px] p-5 flex justify-between">
            <View className="flex flex-row justify-between">
              <View className="flex justify-center">
                <Text className="text-2xl mt-2 mb-2 font-bspace">ETH</Text>
                <Text className="text-md font-space">USD:$3,649.68</Text>
              </View>
              <View className="flex justify-center">
                <Text className="text-md mt-2 mb-2 font-space">Balance</Text>
                <Text className="text-2xl font-bspace">1.00</Text>
              </View>
            </View>
            <View className="bg-teal h-[5px] w-[90%] flex justify-center"></View>
          </View>

          <View className="flex flex-row w-[90%] justify-between mx-auto my-5">
            <TouchableOpacity className="bg-yellow-400 basis-1/2 flex items-center mr-1 justify-center px-4 py-4 rounded-[30px]">
              <Text className="text-xl font-bspace text-white">RECIEVE</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-teal-700 basis-1/2 flex items-center mr-1 justify-center px-4 py-4 rounded-[30px]">
              <Text className="text-xl font-bspace text-white">SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default dashboard;
