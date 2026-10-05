import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getUserRegisterSchema,
  RegisterVType,
} from "../../lib/validation/auth/register";
import AuthBgLayout from "../../components/AuthBgLayout";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";
import Button from "../../components/form/Button";
import { getOtp } from "../../services/authService";
import { useMemo, useState } from "react";
import LoadingSpinner from "../../components/Loading";
import ModalDialog from "../../components/ModalDialog";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/useTranslation";

interface RegisterParams {
  onClick: () => void;
}

function Register(props: RegisterParams) {
  const { onClick } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const registerSchema = useMemo(() => getUserRegisterSchema(t), [t]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterVType> = async (data) => {
    setLoading(true);

    const userPhoneNumber = {
      phone: data.phone,
    };
    const response = await getOtp(userPhoneNumber);
    if (response.status == true) {
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        otp: response.otp,
      };
      const dataToPass = { data: userData, message: "Register" };
      navigate("/otp", { state: dataToPass });
    } else {
      setDialog({
        title: t("common.error"),
        description: response.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthBgLayout
        bgClassName="min-h-[calc(100dvh-5rem)] md:min-h-[calc(100dvh-4rem)]"
        className="p-10"
      >
        <div className="sm:w-[300px] md:w-[350px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[20px] text-gray-800">
              {t("auth.register.title")}
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
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="name"
                  label={t("auth.fields.name")}
                  placeholder={t("auth.placeholders.name")}
                />

                <Input
                  id="phone"
                  label={t("auth.fields.phone")}
                  placeholder={t("auth.placeholders.phoneShort")}
                />

                <Input
                  id="email"
                  label={t("auth.fields.email")}
                  placeholder={t("auth.placeholders.email")}
                />

                <div className="mb-[20px]">
                  <PasswordInput
                    id="password"
                    label={t("auth.fields.createPassword")}
                    placeholder={t("auth.placeholders.createPassword")}
                  />
                </div>

                <div className="mb-[24px]">
                  <PasswordInput
                    id="confirm_password"
                    label={t("auth.fields.confirmPassword")}
                    placeholder={t("auth.placeholders.confirmPassword")}
                  />
                </div>

                <Button type="submit">{t("auth.register.submit")}</Button>

                <div className="text-center text-[14px] pt-[14px]">
                  <span className="text-gray-800">
                    {t("auth.register.haveAccount")}
                  </span>
                  <span
                    onClick={onClick}
                    className="text-blue-100 font-medium cursor-pointer ml-1 hover:text-blue-50"
                  >
                    {t("auth.login.submit")}
                  </span>
                </div>
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
            title: t("auth.register.tryAgain"),
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

export default Register;
