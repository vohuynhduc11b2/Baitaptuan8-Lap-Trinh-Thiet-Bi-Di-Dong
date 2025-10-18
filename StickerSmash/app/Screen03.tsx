import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { TaskContext } from "../context/TaskContext";
import { useRouter } from "expo-router"; // ✅ thêm dòng này

export default function Screen03() {
  const { addTask, updateTask, editingTask, setEditingTask } =
    useContext(TaskContext);
  const [text, setText] = useState("");
  const router = useRouter(); 

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.title);
    } else {
      setText("");
    }
  }, [editingTask]);

  const handleFinish = () => {
    if (editingTask) {
      updateTask(editingTask.id, text);
    } else {
      addTask(text);
    }
    setEditingTask(null);
    router.back(); // ✅ thay cho navigation.goBack()
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        {editingTask ? "EDIT YOUR JOB" : "ADD YOUR JOB"}
      </Text>

      <TextInput
        placeholder="Input your job"
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 20,
          padding: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleFinish}
        style={{ backgroundColor: "cyan", padding: 15, borderRadius: 8 }}
      >
        <Text
          style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        >
          FINISH →
        </Text>
      </TouchableOpacity>

      <Image
        style={{
          width: 120,
          height: 120,
          marginTop: 40,
          alignSelf: "center",
        }}
      />
    </View>
  );
}
