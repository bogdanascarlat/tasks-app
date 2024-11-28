import { Task } from "../types/types";

export const toggleTaskCompletion = (
  taskId: string,
  tasks: Task[],
  updateTask: (task: Task) => void
) => {
  const taskToUpdate = tasks.find((task) => task.id === taskId);
  if (taskToUpdate) {
    updateTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
  }
};
