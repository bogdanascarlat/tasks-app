/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from "react";
import { Task, TasksContextProps } from "../types/types";
import { useAuth } from "../hooks/useAuth";

// Create the context for managing tasks
export const TasksContext = createContext<TasksContextProps | undefined>(
  undefined
);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tasksKey = currentUser ? `tasks_${currentUser.email}` : null;

  // Load tasks from localStorage
  useEffect(() => {
    if (currentUser && tasksKey) {
      try {
        const storedTasks = JSON.parse(localStorage.getItem(tasksKey) || "[]");
        setTasks(storedTasks);
        console.log("Loaded tasks for user:", currentUser.email, storedTasks);
      } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
      }
    } else {
      setTasks([]);
    }
    setLoading(false);
  }, [currentUser, tasksKey]);

  // Function to add a new task
  const addTask = useCallback((task: Task): void => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      if (tasksKey) {
        try {
          localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
        } catch (error) {
          console.error("Failed to save tasks to localStorage:", error);
        }
      }
      console.log("Task added:", task);
      return updatedTasks;
    });
  }, [tasksKey]);

  // Function to update an existing task
  const updateTask = useCallback((updatedTask: Task): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      if (tasksKey) {
        try {
          localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
        } catch (error) {
          console.error("Failed to save tasks to localStorage:", error);
        }
      }
      console.log("Task updated:", updatedTask);
      return updatedTasks;
    });
  }, [tasksKey]);

  // Function to delete a task
  const deleteTask = useCallback((id: string): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      if (tasksKey) {
        try {
          localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
        } catch (error) {
          console.error("Failed to save tasks to localStorage:", error);
        }
      }
      console.log("Task deleted:", id);
      return updatedTasks;
    });
  }, [tasksKey]);

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
