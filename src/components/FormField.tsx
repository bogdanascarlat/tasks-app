import { FormFieldProps } from "../types/types";

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  value,
  label,
  placeholder = "",
  type = "text",
  onChange,
  required = false, 
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 text-sm text-gray-600">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        required={required}
      />
    )}
  </div>
);

export default FormField;
