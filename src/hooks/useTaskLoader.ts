import { useState, useEffect } from "react";
import { Task } from "../types/types";
import { loadFromLocalStorage } from "../utils/storage";

//load tasks from local storage based on a given key (tasksKey)
const useTaskLoader = (tasksKey: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return { tasks, setTasks, loading };
};

export default useTaskLoader;
