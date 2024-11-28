export interface User {
  fname: string;
  lname: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  createDate: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TasksContextProps {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: () => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>
  ) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

export type FormFieldProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

