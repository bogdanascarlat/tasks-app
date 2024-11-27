import "./index.css";

import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginPage />} /> {/* Use LoginPage here */}
      <Route element={<PrivateRoute />}>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/add" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskForm />} />
      </Route>
    </Routes>
  );
}

export default App;
