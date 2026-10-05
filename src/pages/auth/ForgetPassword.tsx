import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBgLayout from "../../components/AuthBgLayout";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useState } from "react";
import ModalDialog from "../../components/ModalDialog";
import {
  ForgetPasswordVType,
  forgetPasswordSchema,
} from "../../lib/validation/auth/forgetPassword";
import { forgetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import { useTranslation } from "../../i18n/useTranslation";
function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Dialog
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ForgetPasswordVType> = async (data) => {
    setLoading(true);
    const response = await forgetPassword(data);

    if (response.status === true) {
      const userData = {
        phone: data.phone,
        otp: response.otp,
      };
      const dataToPass = {
        data: userData,
        message: "Forget Password",
      };
      navigate("/otp", { state: dataToPass, replace: true });
    } else {
      setDialog({
        title: "Error",
        description: response.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthBgLayout bgClassName="h-screen" className="p-10">
        <div className="sm:w-[300px] md:w-[350px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[20px] text-gray-800">
              {t("auth.forgetPassword.title")}
            </h3>
            <div className="w-8 cursor-pointer" onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" text-gray-800 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="pt-[20px]">
            <p className="text-gray-800 text-sm mb-[20px]">
              {t("auth.forgetPassword.description")}
            </p>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[50px]">
                  <Input
                    id="phone"                    
                    type="number"
                    placeholder={t("auth.placeholders.phone")}
                  />
                </div>

                <Button type="submit">{t("auth.forgetPassword.submit")}</Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </AuthBgLayout>
      {dialog && (
        <ModalDialog
          title={dialog.title}
          bodyText={dialog.description}
          btnRight={{
            title: "Ok",
            onClick: () => {
              setDialog(null);
            },
          }}
          onClose={() => {}}
        />
      )}
    </>
  );
}

export default ForgetPassword;
