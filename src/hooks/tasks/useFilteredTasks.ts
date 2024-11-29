import { useMemo } from "react";
import { SortOption, Task } from "../../types/types";

export const useFilteredTasks = (
  tasks: Task[],
  searchTerm: string,
  sortOption?: SortOption
): Task[] => {
  return useMemo(() => {
    const sortFunctions: Record<
      "date" | "number" | "string" | "boolean" | "priority",
      (a: unknown, b: unknown, order: "asc" | "desc") => number
    > = {
      date: (a, b, order) =>
        order === "asc"
          ? new Date(a as string).getTime() - new Date(b as string).getTime()
          : new Date(b as string).getTime() - new Date(a as string).getTime(),
      number: (a, b, order) =>
        order === "asc"
          ? (a as number) - (b as number)
          : (b as number) - (a as number),
      string: (a, b, order) =>
        order === "asc"
          ? String(a).localeCompare(String(b))
          : String(b).localeCompare(String(a)),
      boolean: (a, b, order) =>
        order === "asc" ? Number(a) - Number(b) : Number(b) - Number(a),
      priority: (a, b, order) => {
        const priorityMap = { High: 1, Medium: 2, Low: 3 };
        const priorityA = priorityMap[a as keyof typeof priorityMap];
        const priorityB = priorityMap[b as keyof typeof priorityMap];
        return order === "asc" ? priorityA - priorityB : priorityB - priorityA;
      },
    };

    const sortedTasks = [...tasks];

    // Apply sorting
    if (sortOption) {
      const { field, fieldType, order } = sortOption;

      if (sortFunctions[fieldType]) {
        sortedTasks.sort((a, b) =>
          sortFunctions[fieldType](
            field === "priority" ? a[field] : a[field as keyof Task],
            field === "priority" ? b[field] : b[field as keyof Task],
            order
          )
        );
      }
    }

    // Filter tasks based on the search term (case insensitive)
    return sortedTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm, sortOption]);
};
