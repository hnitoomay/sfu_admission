import { FormProvider, useForm } from "react-hook-form";
import MultipleFileInput from "../../../components/form/MultipleFileInput";
import Button from "../../../components/form/Button";
import { useState } from "react";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { classNames, getExtension } from "../../../lib/helper";
import { addRecDoc, deleteRecDoc } from "../../../services/user/fileAction";
import LoadingSpinner from "../../../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { recomendFileSchema } from "../../../lib/validation/FileUpload";

interface RecFormParams {
  mutate: () => void;
}

function RecomendationForm(props: RecFormParams) {
  const { mutate } = props;

  const { user, userLoading } = useGetAuthUser();
  const [loading, setLoading] = useState(false);

  const [dataFromChild, setDataFromChild] = useState<File | File[] | null>(
    null
  );

  // This function will be passed to the child
  const handleDataFromChild = (childData: File | File[] | null) => {
    setDataFromChild(childData);
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(recomendFileSchema),
    // resolver:
    //   user.is_sfu === 0
    //     ? yupResolver(notSfuEducationInfoUpdateSchema)
    //     : yupResolver(recomendFileSchema),
  });

  const { handleSubmit } = methods;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const result = {
      rec_letters: data.recDoc,
    };

    // create to server
    const response = await addRecDoc(result);
    if (response.message == "Successfully") {
      mutate();
      setDataFromChild(null);
    } else {
      console.log("fail");
    }
    setLoading(false);
  };

  const onDeleteRecDoc = async (id: number) => {
    setLoading(true);
    const response = await deleteRecDoc(id);
    if (response.message === "Successfully") {
      mutate();
    }
    setLoading(false);
  };

  if (loading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white-100 p-6 sm:grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-gray-150 shadow-lg shadow-gray-850/10">
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <p className="text-gray-800 text-lg font-semibold">
                Recommendation Letter
                <span className="ml-1 text-red-100">*</span>
              </p>
              <p className="text-gray-600 text-sm font-normal mt-2">
                Please attach evidence you have occupied a position of
                management responsibility for a minimum of two years within an
                organization.
              </p>
              <p className="text-gray-600 text-sm font-normal mt-2">
                ** The documents should be in PDF or Image format.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:py-4 md:py-8">
            <MultipleFileInput
              id="recDoc"
              type="file"
              placeholder="Attach Here"
              sendDataToParent={handleDataFromChild}
            />

            {dataFromChild && (
              <div className="flex justify-end">
                <Button
                  className="border border-blue-100 bg-blue-100/5 text-blue-100 rounded-md"
                  type="submit"
                >
                  Upload
                </Button>
              </div>
            )}
          </div>

          {user?.rec_letters?.length > 0 && (
            <div
              className={
                (classNames(
                  user.english_result.length
                    ? "border-dashed border-b-2 border-gray-150"
                    : ""
                ),
                "grid sm:grid-cols-1 gap-4")
              }
            >
              <p className="font-semibold">Uploaded Files</p>
              {user?.rec_letters?.map((item: string, index: number) => (
                <div
                  className="bg-blue-150 flex items-center justify-between rounded-lg p-4"
                  key={index}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {getExtension(item, "pdf") == "pdf" ? (
                      <img src="/img/pdf.png" alt="PDF" className="w-10 h-10" />
                    ) : (
                      <img src="/img/img.png" alt="IMG" className="w-10 h-10" />
                    )}
                    <p className="flex-1 lg:text-base sm:text-sm font-medium text-gray-800">
                      Recommendation Document {index + 1}
                    </p>
                  </div>
                  <div
                    onClick={() => onDeleteRecDoc(index)}
                    className="w-fit cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    <DeleteOutlinedIcon
                      sx={{
                        color: "#343330",
                        ":hover": {
                          color: "red",
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default RecomendationForm;
