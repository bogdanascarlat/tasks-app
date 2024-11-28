import { useMemo } from "react";
import { Task } from "../types/types";

export const useFilteredTasks = (
  tasks: Task[],
  searchTerm: string,
  sortOption: string
): Task[] => {
  return useMemo(() => {
    const sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

    // Sort tasks
    if (sortOption === "priority") {
      sortedTasks.sort((a, b) => {
        const priorities = { High: 1, Medium: 2, Low: 3 };
        return priorities[a.priority] - priorities[b.priority];
      });
    } else if (sortOption === "date-desc") {
      sortedTasks.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
    } else if (sortOption === "date-asc") {
      sortedTasks.sort(
        (a, b) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
      );
    } else if (sortOption === "completion") {
      sortedTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return (
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
          );
        }
        return Number(a.completed) - Number(b.completed);
      });
    }

    // Filter tasks
    return sortedTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm, sortOption]);
};
