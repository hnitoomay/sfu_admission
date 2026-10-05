import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUserLoginSchema, LoginVType } from "../../lib/validation/auth/login";
import AuthBgLayout from "../../components/AuthBgLayout";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";
import Button from "../../components/form/Button";
import { login as loginToServer } from "../../services/authService";
import { IUser } from "../../hooks/context/AuthContext";
import { useAuth } from "../../hooks/context/useAuth";
import { useMemo, useState } from "react";
import LoadingSpinner from "../../components/Loading";
import ModalDialog from "../../components/ModalDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/useTranslation";

interface LoginParams {
  onClick: () => void;
}

function Login(props: LoginParams) {
  const { onClick } = props;
  const { t } = useTranslation();

  // Auth Context
  const { login } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const previousRoute = location.state;
  const [loading, setLoading] = useState(false);
  // Dialog
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>();

  const loginSchema = useMemo(() => getUserLoginSchema(t), [t]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginVType> = async (data) => {
    setLoading(true);
    const response = await loginToServer(data);
    if (response.status == "success") {
      const user: IUser = {
        phone: response.phone,
        token: response.token,
      };
      login(user, previousRoute);
    } else {
      setDialog({
        title: t("common.error"),
        description: t("auth.login.invalidCredentials"),
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
              {t("auth.login.title")}
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
                  id="phone"
                  label={t("auth.fields.phone")}
                  type="number"
                  placeholder={t("auth.placeholders.phone")}
                />

                <PasswordInput
                  id="password"
                  label={t("auth.fields.password")}
                  placeholder={t("auth.placeholders.password")}
                />

                <div className="text-right mb-[20px]">
                  <a
                    href="/forget-password"
                    className="text-[14px] text-blue-100 font-medium hover:text-blue-50"
                  >
                    {t("auth.login.forgotPassword")}
                  </a>
                </div>

                <Button type="submit">{t("auth.login.submit")}</Button>

                <div className="text-center text-[14px] pt-[14px]">
                  <span className="text-gray-800">
                    {t("auth.login.noAccount")}
                  </span>
                  <span
                    onClick={onClick}
                    className="text-blue-100 font-medium cursor-pointer ml-1 hover:text-blue-50"
                  >
                    {t("auth.register.submit")}
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
            title: t("common.ok"),
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

export default Login;
