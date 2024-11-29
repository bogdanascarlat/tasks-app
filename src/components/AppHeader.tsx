import React from "react";

const AppHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-blue-700">Taskify</h1>
      <p className="text-sm text-gray-600">
        Simplify your tasks, simplify your life
      </p>
    </div>
  );
};

export default AppHeader;
