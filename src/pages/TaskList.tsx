import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { useTasks } from "../hooks/tasks/useTasks";
import { useFilteredTasks } from "../hooks/tasks/useFilteredTasks";
import ProfileModal from "../components/ProfileModal";
import DropdownArrowIcon from "../assets/icons/DropdownArrowIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import { toggleTaskCompletion } from "../utils/taskUtils";
import { SortOption } from "../types/types";

const TaskList: React.FC = () => {
  const { tasks, loading, deleteTask, updateTask } = useTasks();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { field: "priority", fieldType: "priority", order: "asc" },
    { field: "createDate", fieldType: "date", order: "asc" },
    { field: "createDate", fieldType: "date", order: "desc" },
    { field: "completed", fieldType: "boolean", order: "asc" },
  ];
  const filteredTasks = useFilteredTasks(tasks, searchTerm, sortOption);

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
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ProfileIcon className="w-8 h-8 text-gray-700" />
        </button>
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
        onLogout={logout}
      />

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="relative inline-block w-[50%] md:w-auto">
          <select
            value={sortOption ? JSON.stringify(sortOption) : ""}
            onChange={(e) =>
              setSortOption(
                e.target.value ? JSON.parse(e.target.value) : undefined
              )
            }
            className="border rounded-md pl-3 py-2 w-full text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="">Sort by...</option>
            {sortOptions.map((option, index) => (
              <option key={index} value={JSON.stringify(option)}>
                {option.field === "priority"
                  ? "Priority"
                  : option.field === "createDate" && option.order === "asc"
                  ? "Oldest"
                  : option.field === "createDate" && option.order === "desc"
                  ? "Newest"
                  : "Completion"}
              </option>
            ))}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={() => toggleTaskCompletion(task.id, tasks, updateTask)}
            />
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
