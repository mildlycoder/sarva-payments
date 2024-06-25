import { Text, View, ScrollView, TouchableOpacity, Alert, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log(finalStatus)
    if (finalStatus !== "granted") {
      Alert.alert("You Must Enable Notifications For Updates.");
      return;
    }
    Notifications.getDevicePushTokenAsync;
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const onHandlePress = () => {
    router.replace("/sign-in");
  };
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
        return AsyncStorage.setItem("DeviceToken", token);
      })
      .then((i) => console.log("Token Done", i))
      .catch((e) => console.log("token Error", e));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification)
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <SafeAreaView className="bg-teal-100 gap-2 items-between justify-between">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full gap-3 flex items-center justify-between">
          <View className="bg-teal-700 basis-[60%] w-full rounded-b-[30px] flex items-center justify-center">
            <Text className="text-4xl font-bspace text-white">SARVA</Text>
            <Text className="text-lg tracking-tighter mt-5 font-bspace text-white">
              NOW <Text className="text-yellow-200 ">PAY OFFLINE</Text>
            </Text>
            <Text className="text-lg tracking-tighter font-space text-white">
              ANYTIME, ANYWHERE
            </Text>
          </View>

          <View className="flex basis-[40%] w-full justify-center items-center">
            <Text className="text-xl w-[80%] mx-auto text-center font-bspace text-teal-700">
              OOPS NO INTERNET!
            </Text>
            <Text className="text-md w-[90%] mx-auto text-center font-space text-teal-700">
              DON'T WORRY WE GOT YOUR BACK
            </Text>

            <TouchableOpacity
              onPress={onHandlePress}
              className="bg-rose-400 w-[90%] my-6 flex items-center justify-center px-4 py-6 rounded-full"
            >
              <Text className="text-xl font-bspace text-black">JOIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
