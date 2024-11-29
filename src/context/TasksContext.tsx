/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from "react";
import { Task, TasksContextProps } from "../types/types";
import { useAuth } from "../hooks/auth/useAuth";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/storage";

// Create the context for managing tasks
export const TasksContext = createContext<TasksContextProps | undefined>(
  undefined
);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: currentUser } = useAuth();
  const tasksKey = currentUser ? `tasks_${currentUser.email}` : null;

  // State for managing tasks and loading
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load tasks directly within the provider
  useEffect(() => {
    if (tasksKey) {
      const storedTasks = loadFromLocalStorage<Task[]>(tasksKey);
      setTasks(storedTasks || []);
      console.log("Loaded tasks:", storedTasks);
    } else {
      setTasks([]);
    }
    setLoading(false);
  }, [tasksKey]);

  // Function to add a new task
  const addTask = useCallback(
    (task: Task): void => {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, task];
        if (tasksKey) saveToLocalStorage(tasksKey, updatedTasks);
        console.log("Task added:", task);
        return updatedTasks;
      });
    },
    [tasksKey]
  );

  // Function to update an existing task
  const updateTask = useCallback(
    (updatedTask: Task): void => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        if (tasksKey) saveToLocalStorage(tasksKey, updatedTasks);
        console.log("Task updated:", updatedTask);
        return updatedTasks;
      });
    },
    [tasksKey]
  );

  // Function to delete a task
  const deleteTask = useCallback(
    (id: string): void => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        if (tasksKey) saveToLocalStorage(tasksKey, updatedTasks);
        console.log("Task deleted:", id);
        return updatedTasks;
      });
    },
    [tasksKey]
  );

  // Function to toggle task completion
  const toggleTaskCompletion = useCallback((id: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
