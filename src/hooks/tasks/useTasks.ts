import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";

// Custom hook to access the TasksContext.
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

