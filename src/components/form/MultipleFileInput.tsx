import {
  useFormContext,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import { useCallback, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { MAX_FILE_SIZE } from "../../lib/helper";
import { useTranslation } from "../../i18n/useTranslation";

interface InputParams {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  infoText?: string;
  type?: "file";
  readOnly?: boolean;
  requiredField?: boolean;
  validation?: RegisterOptions;
  value?: [] | File[];
  hasEng?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendDataToParent?: any;
}

export default function MultipleFileInput({
  id,
  label,
  helperText = "",
  infoText = "",
  type = "file",
  readOnly = false,
  validation,
  value,
  sendDataToParent,
}: InputParams) {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const pickFiles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files, ...selectedFiles];
        const invalidFiles = selectedFiles.filter(
          (file) => file.size > MAX_FILE_SIZE
        );

        if (sendDataToParent) {
          sendDataToParent(newFiles);
        }

        if (invalidFiles.length > 0) {
          setFileError(t("profile.fileSizeError"));
        } else {
          setFileError(null);
          setFiles(newFiles);
          setValue(id, newFiles);
        }
      }
    },
    [files, id, sendDataToParent, setValue, t]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      if (sendDataToParent) {
        sendDataToParent(!newFiles?.length ? null : newFiles);
      }
      setValue(id, newFiles);
      if (newFiles.length === 0) resetField(id);
    },
    [files, id, resetField, sendDataToParent, setValue]
  );

  const getErrorMessage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ): string | null => {
    if (!error) return null;
    if ("message" in error) return error.message as string;
    if (Array.isArray(error)) return error.map((e) => e.message).join(", ");
    return null;
  };

  return (
    <div className="mb-[20px]">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-800 text-left"
        >
          {label}
        </label>
      )}
      {type === "file" && infoText && (
        <div className="bg-white-150 flex space-x-2 p-4 mb-4 rounded-lg">
          <img src="/img/warning.png" alt="Warning" className="w-auto h-fit" />
          <p className="text-sm text-gray-800 text-left">&nbsp;*{infoText}</p>
        </div>
      )}

      <div className="relative">
        <div
          className="flex items-center justify-center
           w-full p-3 border-dashed border-2 text-sm rounded-lg placeholder-gray-200"
        >
          <div className="flex items-center justify-center space-x-2">
            <CloudUploadOutlinedIcon
              fontSize="large"
              sx={{ color: "#C0C0C0" }}
            />
            <p className="sm:text-[14px] md:text-base text-gray-200 text-center">
              {t("profile.dropFilesPrefix")}{" "}
              <span
                className="text-black-100 underline underline-offset-1 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {t("profile.chooseFiles")}
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
              onChange={pickFiles}
              multiple
              hidden
              disabled={
                value?.length == 0 || value?.length == undefined ? false : true
              }
              accept=".pdf, .png, .jpeg, .jpg"
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="flex flex-col py-4 px-8 bg-blue-150 rounded-lg  border-l-2 border-l-blue-100 mt-[10px]">
            {files.map((file, index) => {
              return (
                <div key={index} className="flex justify-between py-2  ">
                  <div className="flex space-x-4">
                    {file.type == "application/pdf" ? (
                      <img src="/img/pdf.png" alt="PDF" className="w-10 h-10" />
                    ) : (
                      <img src="/img/img.png" alt="IMG" className="w-10 h-10" />
                    )}
                    <div className="flex flex-col">
                      <p className="text-gray-800 text-base font-medium">
                        {file.name}
                      </p>
                      <p className="text-gray-400 text-xs font-normal">
                        {Math.round(file.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ClearOutlinedIcon
                      className="cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      sx={{
                        color: "red",
                      }}
                      onClick={() => removeFile(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {value?.length && (
          <div className="flex flex-col py-4 px-8 rounded-lg mt-[10px]">
            {value?.map((_file, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex flex-col">
                  <p className="text-gray-800 text-base font-medium">
                    {id + (index + 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-1 text-left">
        {helperText !== "" && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {getErrorMessage(errors[id]) && (
          <span className="text-sm text-primary text-left">
            {getErrorMessage(errors[id])}
          </span>
        )}

        {fileError && (
          <span className="text-sm text-primary text-left">{fileError}</span>
        )}
      </div>
    </div>
  );
}
