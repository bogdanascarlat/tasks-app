/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Task, TasksContextProps } from "../types/types";
import { useAuth } from "../hooks/useAuth";

// Create the context for managing tasks
export const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Access the current authenticated user using the custom useAuth hook
  const { user: currentUser } = useAuth();

  // State for managing tasks and a loading indicator
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Key for storing tasks specific to the current user in localStorage
  const tasksKey = currentUser ? `tasks_${currentUser.email}` : null;

  // Load tasks from localStorage when the authenticated user or the task key changes
  useEffect(() => {
    if (currentUser && tasksKey) {
      const storedTasks = localStorage.getItem(tasksKey);
      const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
      setTasks(initialTasks);
      console.log("Loaded tasks for user:", currentUser.email, initialTasks);
    } else {
      setTasks([]); // Reset tasks if no user is logged in
    }
    setLoading(false); // Set loading to false after tasks are loaded
  }, [currentUser, tasksKey]);

  // Save tasks to localStorage whenever tasks are updated and a user is logged in
  useEffect(() => {
    if (currentUser && tasksKey) {
      localStorage.setItem(tasksKey, JSON.stringify(tasks));
      console.log(
        "Tasks saved to localStorage for user:",
        currentUser.email,
        tasks
      );
    }
  }, [tasks, currentUser, tasksKey]);

  // Function to add a new task
  const addTask = useCallback(async (task: Task): Promise<void> => {
    return new Promise((resolve) => {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, task];
        console.log("Task added:", task);
        resolve(); // Resolve the promise after the task is added
        return updatedTasks;
      });
    });
  }, []);

  // Function to update an existing task
  const updateTask = useCallback(async (updatedTask: Task): Promise<void> => {
    return new Promise((resolve) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        console.log("Task updated:", updatedTask);
        resolve(); // Resolve the promise after the task is updated
        return updatedTasks;
      });
    });
  }, []);

  // Function to delete a task by its ID
  const deleteTask = useCallback(async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        console.log("Task deleted:", id);
        resolve();
        return updatedTasks;
      });
    });
  }, []);

  // Provide the tasks and task-related functions to child components
  return (
    <TasksContext.Provider
      value={{ tasks, loading, addTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
