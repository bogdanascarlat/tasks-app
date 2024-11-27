import React, { memo } from "react";
import { TaskItemProps } from "../types/types";
import { Link } from "react-router-dom";

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out">
      <div className="mb-4">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={task.title}
        >
          {task.title}
        </h2>
        <p
          className="text-gray-600 text-sm line-clamp-3 overflow-hidden"
          title={task.description}
        >
          {task.description}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(task.createDate).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={`/tasks/edit/${task.id}`} // Navigates to the edit page for the specific task
          className="text-blue-500 font-medium px-3 py-1 rounded-md hover:text-blue-600 hover:bg-blue-100 transition duration-200"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(task.id)} // Calls the onDelete function passed via props with the task's ID
          className="text-red-500 font-medium px-3 py-1 rounded-md hover:text-red-600 hover:bg-red-100 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(TaskItem);
