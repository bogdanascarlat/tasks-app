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
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
