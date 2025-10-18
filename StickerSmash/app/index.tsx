import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { TaskContext } from "../context/TaskContext";
import Screen02 from "./Screen02";
export default function index() {
  const [name, setName] = useState("");
  const { setUserName } = useContext(TaskContext);
  const router = useRouter();

  const handleStart = () => {
    if (name.trim() === "") return;
    setUserName(name);
    router.push("/Screen02"); // chuyển sang màn 2
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* Hình minh họa (bạn có thể thay bằng hình trong assets) */}
      <Image
        source={require("../assets/images/icon.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "purple",
          marginBottom: 20,
        }}
      >
        MANAGE YOUR TASK
      </Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          width: "70%",
          marginBottom: 20,
          padding: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleStart}
        style={{
          backgroundColor: "cyan",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}
