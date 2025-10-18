import React, { createContext, useState, useEffect } from "react";

// Đường dẫn Fake API
const API_URL = "https://68cac60b430c4476c34ae5c5.mockapi.io/product";

// Định nghĩa kiểu dữ liệu (nếu bạn dùng TypeScript)
export interface Task {
  id: string;
  title: string;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (text: string) => void;
  updateTask: (id: string, newText: string) => void;
  deleteTask: (id: string) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  userName: string;
  setUserName: (name: string) => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [userName, setUserName] = useState("");

  // 🟢 Lấy danh sách task khi app khởi động
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🟢 Thêm task mới
  const addTask = async (text: string) => {
    if (!text.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🟢 Cập nhật task
  const updateTask = async (id: string, newText: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newText }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 🟢 Xóa task
  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        editingTask,
        setEditingTask,
        userName,
        setUserName,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
