import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import * as SMS from "expo-sms";
import { router } from "expo-router";
import * as Notifications from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCredStore } from "../store/credStore";
export default function GetDetails() {
  const [privateKey, setPrivateKey] = useState("");
  const notificationListener = useRef(null)
  const responseListener = useRef(null)
  const publicAddr = useCredStore((state: any) => state.publicAddress);
  const setCreds = useCredStore((state: any) => state.setCreds);
  const [isLoading, setLoading] = useState(false);
  const setLoggedIn = useCredStore((state: any) => state.setLoggedIn);

  const onHandlePress = async () => {
    try {
      console.log(publicAddr);
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
           ["7558436164"],
          `Sarva \n publicAddr:${publicAddr}`,
        );
        console.log(result)
      } else {
        console.log("can't access messages");
      }
    } catch (error) {
      console.error("Error computing address:", error);
    }
  };

  useEffect(() => {
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    });
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);


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
              GET <Text className="text-yellow-200 ">YOUR WALLET</Text>
            </Text>
            <Text className="text-lg tracking-tighter font-space text-white">
              FIND YOUR INFO OFFLINE
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

            <TouchableOpacity
              onPress={onHandlePress}
              className="bg-rose-400 w-[90%] flex items-center justify-center px-4 py-6 rounded-full"
            >
              <Text className="text-xl font-bspace text-black">
                GET ACCOUNT
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
