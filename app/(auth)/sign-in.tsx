import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCredStore } from "../store/credStore";
export default function Index() {
  const [privateKey, setPrivateKey] = useState("");
  const publicAddr = useCredStore((state: any) => state.publicAddress);
  const setCreds = useCredStore((state: any) => state.setCreds);
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState('My sample HelloWorld message');
  const setLoggedIn = useCredStore((state: any) => state.setLoggedIn);

  useEffect(() => {
    const retrieveKey = async () => {
      setLoading(true)
      const value = await AsyncStorage.getItem("my-key");
      if (value) {
        const publicAddress = ethers.computeAddress(value);
        setCreds(publicAddress);
        console.log(publicAddress);
        setLoading(false)
        if (publicAddress) router.push('/get-details');
      }
    };
    retrieveKey();
  }, []);
  const onHandlePress = async () => {
    try {
      const key = "0x" + privateKey;
      const publicAddress = ethers.computeAddress(key);
      setCreds(publicAddress);
      console.log(publicAddr);
      await AsyncStorage.setItem("my-key", key);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error computing address:", error);
    }
  };

  return (
    <SafeAreaView className="bg-teal-100">
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{ height: "100%", flexGrow: 1 }}
      >
        <View className="h-full flex items-center justify-between">
          <View className="flex min-h-[60%] w-full bg-teal-800 rounded-b-[30px] items-center justify-center">
            <StatusBar style="auto" />
            <Text className="text-4xl font-bspace text-white">SARVA</Text>
            <Text className="text-lg tracking-tighter mt-5 font-bspace text-white">
              IMPORT <Text className="text-yellow-200 ">YOUR WALLET</Text>
            </Text>
            <Text className="text-lg tracking-tighter font-space text-white">
              EXPERIENCE FUTURE
            </Text>
          </View>
          <KeyboardAvoidingView className="min-h-[40%] flex items-center justify-between py-6 w-full">
            <View className="flex items-center justify-center">
              <Text className="text-xl text-center font-bspace text-teal-700">
                IMPORT YOUR WALLET USING PRIVATE KEY
              </Text>
              <Text className="text-md text-center font-space text-teal-700">
                FROM ANY ETHEREUM WALLET
              </Text>
            </View>

            <TextInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="Paste Your private key"
              className="bg-white text-lg w-[90%] text-center font-bspace px-4 py-4 rounded-full"
            />
            <TouchableOpacity
              onPress={onHandlePress}
              disabled={privateKey === ""}
              className="bg-rose-400 w-[90%] flex items-center justify-center px-4 py-6 rounded-full"
            >
              <Text className="text-xl font-bspace text-black">{(isLoading) ? "IMPORT" : "LOADING..."}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
