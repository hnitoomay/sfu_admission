/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
export default function CheckBox({
  id,
  label,
  helperText = "",
  type = "checkbox",
  checked,
  onChange,
  value,
  readOnly = false,
  validation,
}: {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  checked?: boolean | undefined;
  value?: any;
  onChange?: any;
  type?:
    | "text"
    | "email"
    | "number"
    | "password"
    | "file"
    | "hidden"
    | "checkbox"
    | "image"
    | "radio"
    | "search"
    | "submit"
    | "tel";
  readOnly?: boolean;
  validation?: RegisterOptions;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(id, e.target.checked);  // Update the form state based on the checkbox id
    onChange?.(e.target.checked, id);  // Pass the checked state and id back to parent handler
  };
  
  return (
    <div className="">
      <div className="relative">
        <input
          {...register(id, validation)}
          id={id}
          name={id}
          type={type}
          readOnly={readOnly}
          checked={checked}
          onChange={handleChange}
          value={value}
          className="w-5 h-5 text-primary bg-white-100 border-gray-300 rounded focus:ring-gray-400"
        />

        {label && (
          <label
            htmlFor={id}
            className="inline mb-2 ml-3 sm:text-[12px] md:text-[16px] font-medium text-gray-600"
          >
            {label}
          </label>
        )}

        {errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon className="w-5 h-5 text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1">
        {helperText !== "" && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {errors[id] && (
          <span className="text-sm text-red-50">
            {errors[id]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
