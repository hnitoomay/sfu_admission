import { useFormContext, RegisterOptions } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../lib/helper";

interface InputParams {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  infoText?: string;
  readOnly?: boolean;
  requiredField?: boolean;
  validation?: RegisterOptions;
  className?: string;
}

export default function TextArea({
  id,
  label,
  placeholder = "",
  helperText = "",
  readOnly = false,
  requiredField = false,
  validation,
  className,
}: InputParams) {
  const {
    register,
    formState: { errors },
  } = useFormContext();


  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            className ? className : '',
            "block mb-1 text-sm font-medium text-gray-800 text-left"
          )}
        >
          {label}
          {requiredField && <span className="text-red-400">&nbsp;*</span>}
        </label>
      )}
      <div className="relative">
          <textarea
            {...register(id, validation)}
            rows={5}
            name={id}
            id={id}
            readOnly={readOnly}
            className={classNames( 
              readOnly
                ? "bg-gray-50 text-gray-800 focus:ring-0 cursor-not-allowed border-gray-200 focus:border-gray-200"
                : errors[id]
                ? "bg-gray-50 text-gray-800 border-red-50 focus:ring-red-50 focus:border-red-50"
                : "bg-white-100 text-gray-900 border border-gray-300 focus:ring-gray-200 focus:border-gray-800",
              "block w-full border text-sm rounded-lg p-2.5 placeholder-gray-200"
            )}
            placeholder={placeholder}
          aria-describedby={id}
          autoComplete="off"
          />
        {errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon className="w-5 h-5 text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1 text-left">
        {helperText !== "" && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {errors[id] && (
          <span className="text-sm text-red-50 text-left">
            {errors[id]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
