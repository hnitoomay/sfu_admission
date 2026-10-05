/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import "../../css/custom.css";
import { classNames } from "../../lib/helper";

export default function RadioButton({
  id,
  label,
  value,
  helperText = "",
  validation,
  onChange,
  checked,
  className,
}: {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value: any;
  readOnly?: boolean;
  validation?: RegisterOptions;
  onChange?: any;
  checked?: boolean;
  className?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-5">
      <div className="relative">
        <input
          {...register(id, validation)}
          type="radio"
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          className={classNames(
            className ? className : "",
            "w-6 h-6 text-primary bg-white-100 border-gray-300 rounded focus:ring-gray-400"
          )}
        />

        {label && (
          <label
            htmlFor={id}
            className="inline block mb-2 ml-3 text-[16px] font-medium text-gray-800"
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
