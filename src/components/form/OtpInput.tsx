import { useFormContext, RegisterOptions } from "react-hook-form";
import { useState, useRef } from "react";

interface InputParams {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  infoText?: string;
  validation?: RegisterOptions;
}

const OtpInput = (props: InputParams) => {
  const { id, placeholder, validation } = props;

  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  // Initialize inputRefs array with useRef
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { register, setValue } = useFormContext();

  const handleChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move focus to the next input
    }

    const otpValue = newInputs.join("");
    setValue(id, otpValue); // Set the combined OTP value
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && inputs[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
    }
  };

  return (
    <div className="flex space-x-2">
      {inputs.map((value, index) => (
        <input
          key={index}
          name={`${id}-${index}`}
          id={`${id}-${index}`}
          ref={(el) => (inputRefs.current[index] = el)}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className="block w-[50px] h-[50px] bg-gray-50 text-black-100 text-center border text-sm font-bold rounded-lg placeholder-gray-200 focus:ring-gray-900 focus:border-gray-900"
          placeholder={placeholder}
          aria-describedby={id}
          autoComplete="off"
        />
      ))}
      <input
        type="hidden"
        {...register(id, validation)}
        value={inputs.join("")}
      />
    </div>
  );
};

export default OtpInput;
