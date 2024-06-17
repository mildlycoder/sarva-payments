import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicAddr, setPublicAddr] = useState("");

  const onHandlePress = () => {
    try {
      const key = "0x" + privateKey;
      console.log(key);

      const publicAddress = ethers.computeAddress(key);
      setPublicAddr(publicAddress);
    } catch (error) {
      console.error("Error computing address:", error);
      setPublicAddr("Invalid private key");
    }
  };

  return (
    <SafeAreaView className="bg-green-600">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full flex items-center justify-center p-2">
          <View className="flex items-center justify-center m-4">
            <StatusBar style="auto" />
            <Image source={require("../../assets/icon.png")} />
            <Text className="text-3xl font-space text-white">Sarva</Text>
            <Text className="text-3xl font-space text-white">{publicAddr}</Text>
          </View>
          <View className="bg-white flex items-center justify-between p-2 m-4 rounded-[30px] w-full">
            <TextInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="Enter your private key"
              className="text-xl font-space text-white border-2 bg-orange-500 border-orange-500 w-full mb-5 px-4 py-2 rounded-[30px]"
            />
            <TouchableOpacity
              onPress={onHandlePress}
              className="bg-orange-500 w-full flex items-center justify-center px-4 py-4 rounded-[30px]"
            >
              <Text className="text-xl font-space text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
