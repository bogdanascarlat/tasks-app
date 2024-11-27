import React, { useState, useMemo } from "react";
import TaskItem from "./TaskItem";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

const TaskList: React.FC = () => {
  const { tasks, loading, deleteTask } = useTasks();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Memoized filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    const sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

    // Sort tasks by date descending or ascending
    if (sortOption === "date-desc") {
      sortedTasks.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
    } else if (sortOption === "date-asc") {
      sortedTasks.sort(
        (a, b) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
      );
    }

    // Filter tasks based on the search term (case insensitive)
    return sortedTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm, sortOption]); // Re-compute only when tasks, searchTerm, or sortOption changes

  // Loading state handler
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">List of Tasks</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="relative inline-block w-[50%] md:w-auto">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md pl-3 py-2 w-full text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="">Sort by date</option>
            <option value="date-desc">Descending</option>
            <option value="date-asc">Ascending</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <Link
          to="/tasks/add"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Task
        </Link>
      </div>

      {/* Tasks */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No tasks found.</p>
          <p className="text-sm">Add a new task to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
