import { useFormContext, RegisterOptions } from "react-hook-form";
import { useCallback, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

interface InputParams {
  id: string;
  placeholder?: string;
  helperText?: string;
  infoText?: string;
  type?: "file";
  readOnly?: boolean;
  requiredField?: boolean;
  validation?: RegisterOptions;
  value?: string;
  hasEng?: boolean;
}

export default function FileInputUpdate({
  id,
  helperText = "",
  type = "file",
  readOnly = false,
  validation,
  value,
}: InputParams) {
  const {
    register,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | string>();

  const pickFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setFileName(file?.name);
        setFileSize(file?.size);
        setValue(id, file);
      }
    },
    [id, setValue]
  );

  const removeFile = useCallback(() => {
    setFileName("");
    setFileSize("");
    resetField(id);
  }, [id, resetField]);

  return (
    <div className="mb-[20px]">
        <div className="relative">
          <div className="flex items-center justify-center block bg-white-50 w-full p-3 border-dashed border-2 text-sm rounded-lg placeholder-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <CloudUploadOutlinedIcon
                fontSize="large"
                sx={{ color: "#C0C0C0" }}
              />
              <p className="text-gray-200 text-center">
                Drop file here to upload or{" "}
                <span
                  className="text-blue-100 underline underline-offset-1 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </span>
              </p>
            </div>
            <div className="h-[42px] flex items-center justify-center rounded-r-lg cursor-pointer">
              <input
                {...register(id, validation)}
                type={type}
                name={id}
                id={id}
                ref={fileInputRef}
                readOnly={readOnly}
                onChange={pickFile}
                hidden
              />
            </div>
          </div>

          {(fileName || value) && (
            <div className="flex justify-between py-4 px-8 rounded-lg bg-blue-150 mt-[10px]">
              <div className="flex flex-col">
                <p className="text-gray-800 text-base font-medium">
                  {fileName ? fileName : value}
                </p>
                <p className="text-gray-400 text-xs font-normal">
                  {fileSize && fileSize}KB
                </p>
              </div>
              {fileSize && (
                <div className="flex items-center justify-center">
                  <img
                    src="/img/delete.png"
                    alt="Delete"
                    className="cursor-pointer"
                    onClick={removeFile}
                  />
                </div>
              )}
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
