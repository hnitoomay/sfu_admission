/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Select from "react-select";
import "../../css/custom.css";
import { classNames } from "../../lib/helper";

export interface ReactSelectOption {
  value: string | number;
  label: string;
}
interface SelectParams {
  id: string;
  label?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  helperText?: string;
  optionsString?: string[];
  optionsObject?: ReactSelectOption[];
  defaultValue?: number;
  requiredField?: boolean;
  onChange?: (option: ReactSelectOption | null) => void; 
  className?: string;
}

export default function ReactSelect({
  id,
  label,
  placeholder,
  validation,
  disabled = false,
  helperText,
  optionsString,
  optionsObject,
  defaultValue,
  onChange,
  className,
  ...rest
}: SelectParams) {
  const customStyles = {
    control: (styles: any, state: any) => ({
      ...styles,
      height: "42px",
      border: state.isFocused ? "0" : "1px solid #C0C0C0",
      boxShadow: state.isFocused ? "0 0 0 0.07rem #212121" : 0,
      "*": {
        boxShadow: "none !important",
      },
      borderRadius: "8px",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      color: "black",
      background: state.isSelected ? "#D1D5DB" : "white",
      ":hover": {
        background: "#E5E7EB",
      },
    }),
  };

  const errorStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "none",
      boxShadow: "0 0 0 0.04rem #EF4444",
      "*": {
        boxShadow: "none !important",
      },
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      color: "black",
      background: state.isSelected ? "#D1D5DB" : "white",
      ":hover": {
        background: "#E5E7EB",
      },
    }),
  };
  
  const options =
    optionsObject !== undefined
      ? optionsObject
      : optionsString?.map((option) => ({ value: option, label: option }));

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      {label && (
        <p
          className={classNames(
            className ? className : "",
            "block mb-1 text-sm font-medium text-gray-800 text-left"
          )}
        >
          {label}
        </p>
      )}
      <div className="relative">
        <Controller
          name={id}
          defaultValue={defaultValue ? options?.[defaultValue] : -1}
          control={control}
          rules={validation}
          render={({ field }) => {
            const styles = errors[id] ? errorStyles : customStyles;
            return onChange ? (
              <Select
                {...field}
                isDisabled={disabled}
                placeholder={placeholder}
                options={options}
                styles={styles}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  if (onChange) {
                    onChange(selectedOption);
                  }
                }}
                {...rest}
              />
            ) : (
              <Select
                {...field}
                isDisabled={disabled}
                placeholder={placeholder}
                options={options}
                styles={styles}
                {...rest}
              />
            );
          }}
        />
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
    </div>
  );
}
