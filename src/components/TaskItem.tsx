import React from "react";
import { TaskItemProps } from "../types/types";
import { Link } from "react-router-dom";

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          className={`text-lg font-semibold truncate ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
          title={task.title}
        >
          {task.title}
        </h2>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>
      <p
        className={`text-sm font-semibold ${
          task.priority === "High"
            ? "text-red-600"
            : task.priority === "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        } mt-2`}
      >
        Priority: {task.priority}
      </p>
      <p
        className="text-gray-600 text-sm line-clamp-3 overflow-hidden"
        title={task.description}
      >
        {task.description}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(task.createDate).toLocaleString()}
      </p>
      <div className="flex items-center justify-between mt-4">
        <Link
          to={`/tasks/edit/${task.id}`}
          className="text-green-500 font-medium px-3 py-1 rounded-md hover:text-green-600 hover:bg-green-100 transition duration-200"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 font-medium px-3 py-1 rounded-md hover:text-red-600 hover:bg-red-100 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
