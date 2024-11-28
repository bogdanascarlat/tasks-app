const Alert: React.FC<{ type: "error" | "success"; message: string }> = ({
  type,
  message,
}) => (
  <div
    className={`${
      type === "error"
        ? "bg-red-100 border-red-400 text-red-700"
        : "bg-green-100 border-green-400 text-green-700"
    } px-4 py-3 rounded relative mb-4`}
  >
    {message}
  </div>
);
export default Alert;
