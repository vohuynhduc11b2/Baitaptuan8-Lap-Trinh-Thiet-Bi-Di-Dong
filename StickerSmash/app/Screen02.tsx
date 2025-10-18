import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { TaskContext } from "../context/TaskContext";
import { useRouter } from "expo-router";

export default function Screen02() {
  const router = useRouter();
  const { tasks, setEditingTask, userName } = useContext(TaskContext);
  const [search, setSearch] = useState("");

  const filteredTasks = (tasks || []).filter(
  (t) => t?.title?.toLowerCase?.().includes(search.toLowerCase())
);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hi {userName}</Text>
          <Text style={{ color: "gray" }}>Have a great day ahead</Text>
        </View>
      </View>

      {/* Search box */}
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 20,
          padding: 10,
        }}
      />

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/images/icon.png")}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => {
                setEditingTask(item);
                router.push("/Screen03");
              }}
            >
             <Text>aaaa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add new task button */}
      <TouchableOpacity
        style={{
          backgroundColor: "cyan",
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={() => {
          setEditingTask(null);
          router.push("/Screen03");
        }}
      >
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
