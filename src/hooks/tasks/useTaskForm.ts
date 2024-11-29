/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Task } from "../../types/types";
import { useTasks } from "./useTasks";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useTaskForm = () => {
  const { tasks, addTask, updateTask } = useTasks();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Task>({
    id: "",
    title: "",
    description: "",
    createDate: "",
    completed: false,
    priority: "Medium",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch task data if editing an existing task
  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setFormData(taskToEdit);
      }
    }
  }, [id, tasks]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.title.trim()) {
        throw new Error("Title is required.");
      }

      if (id) {
        await updateTask(formData);
        setSuccess("Task updated successfully!");
      } else {
        await addTask({
          ...formData,
          id: uuidv4(),
          createDate: new Date().toISOString(),
        });
        setSuccess("Task added successfully!");
      }

      setTimeout(() => navigate("/tasks"), 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the task.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  return {
    formData,
    saving,
    error,
    success,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
