import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface ProfileModalProps {
  isOpen: boolean;
  user: { fname: string; lname: string; email: string } | null;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  onLogout,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
              <Button onClick={onClose} variant="secondary">
                Close
              </Button>
              <Button onClick={onLogout} variant="danger">
                Logout
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
