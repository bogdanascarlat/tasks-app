import { useState } from "react";

// Manages logout confirmation modal
const useLogoutModal = (onConfirm: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmLogout = () => {
    onConfirm();
    closeModal();
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmLogout,
  };
};

export default useLogoutModal;
