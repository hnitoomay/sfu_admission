import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBgLayout from "../../components/AuthBgLayout";
import PasswordInput from "../../components/form/PasswordInput";
import Button from "../../components/form/Button";
import { useEffect, useMemo, useState } from "react";
import ModalDialog from "../../components/ModalDialog";
import {
  ChangePasswordVType,
  changePasswordSchema,
} from "../../lib/validation/auth/forgetPassword";
import { useLocation, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/authService";
import LoadingSpinner from "../../components/Loading";
import { useTranslation } from "../../i18n/useTranslation";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dataFromForgetPwd = location.state;

  const [loading, setLoading] = useState(false);
  // Dialog
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>();

  const userPhone = useMemo(() => dataFromForgetPwd, [dataFromForgetPwd]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ChangePasswordVType) => {
    setLoading(true);
    const res = {
      phone: userPhone?.phone,
      new_password: data.password,
    };
    const response = await changePassword(res);
    if (response.status == true) {
      window.localStorage.removeItem("tmpOtp");
      navigate("/login", { replace: true });
    } else {
      setDialog({
        title: "Error",
        description: response.message,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const tmpOtp = window.localStorage.getItem("tmpOtp");
    if (!tmpOtp) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthBgLayout bgClassName="h-screen" className="p-10">
        <div className="sm:w-[300px] md:w-[350px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[20px] text-gray-800">
              {t("auth.changePassword.title")}
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
          <div className="pt-[40px]">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4 mb-[50px]">
                  <PasswordInput
                    id="password"
                    label="New Password"
                    placeholder="Enter password"
                  />

                  <PasswordInput
                    id="confirm_password"
                    label="Confirm New Password"
                    placeholder="Re-enter password"
                  />
                </div>

                <Button type="submit">{t("auth.changePassword.continue")}</Button>
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

export default ChangePassword;
