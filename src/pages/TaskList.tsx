import React, { useState, useMemo } from "react";
import TaskItem from "../components/TaskItem";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { motion, AnimatePresence } from "framer-motion";
import ProfileIcon from "../assets/icons/ProfileIcon";
import DropdownArrowIcon from "../assets/icons/DropdownArrowIcon";

const TaskList: React.FC = () => {
  const { tasks, loading, deleteTask, updateTask } = useTasks();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      updateTask(updatedTask);
    }
  };

  // Memoized filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    const sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

    // Sort tasks by priority, by date descending or ascending and by completion
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
        // Sort by completion status and use the creation date to ensure stable sorting
        if (a.completed === b.completed) {
          return (
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
          );
        }
        return Number(a.completed) - Number(b.completed);
      });
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
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.fname || "User"}!
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            Let's check some tasks today! ✅
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)} // Open profile modal on click
          className="flex items-center justify-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ProfileIcon className="w-8 h-8 text-gray-700" />
        </button>
      </div>

      {/* Profile modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-80 p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Details
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Name:</strong> {user?.fname} {user?.lname}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Email:</strong> {user?.email}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Close
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="relative inline-block w-[50%] md:w-auto">
          {/* Sort dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md pl-3 py-2 w-full text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="">Sort by...</option>
            <option value="priority">Priority</option>
            <option value="completion">Completion</option>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <DropdownArrowIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        <Link
          to="/tasks/add"
          className="bg-blue-800 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add a task
        </Link>
      </div>

      {filteredTasks.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TaskItem
                  task={task}
                  onDelete={deleteTask}
                  onToggle={() => toggleTaskCompletion(task.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
