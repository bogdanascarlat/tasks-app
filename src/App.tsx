import "./index.css";

import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import LoginPage from "./pages/LoginPage";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import PrivateRoute from "./hoc/PrivateRoute";

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
