import { useEffect } from "react";

// Manages the Esc key
const useEscapeKey = (onEscape: () => void, isActive: boolean) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onEscape, isActive]);
};

export default useEscapeKey;
