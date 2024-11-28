import React from "react";

const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.673 0-8 1.342-8 4v2h16v-2c0-2.658-5.327-4-8-4z" />
    </svg>
  );
};

export default ProfileIcon;
