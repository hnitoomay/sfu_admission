import { FormProvider, useForm, useWatch } from "react-hook-form";
import AuthBgLayout from "../../components/AuthBgLayout";
import Button from "../../components/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getOtp, register } from "../../services/authService";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../components/Loading";
import ModalDialog from "../../components/ModalDialog";
import OtpInput from "../../components/form/OtpInput";
import { useAuth } from "../../hooks/context/useAuth";
import { IUser } from "../../hooks/context/AuthContext";
import { login as loginToServer } from "../../services/authService";
import { format } from "../../lib/helper";

function Otp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth Context
  const { login } = useAuth();
  const dataFromRegisterOrForgetPwd = location.state;

  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [counter, setCounter] = useState(60);

  const userRegisterData = useMemo(
    () => dataFromRegisterOrForgetPwd,
    [dataFromRegisterOrForgetPwd]
  );

  const user = userRegisterData?.data;
  const type = userRegisterData?.message;

  const methods = useForm({
    mode: "onChange",
  });

  const { control, handleSubmit } = methods;

  const handleRegister = async (otp: string) => {
    if (otp !== userRegisterData?.data?.otp) {
      throw new Error("Code is wrong!");
    }

    const userData = {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      password: user?.password,
    };

    const response = await register(userData);

    if (response.status !== "success") {
      throw new Error(response?.message || "Registration failed");
    }

    const userLoginData = {
      phone: user?.phone,
      password: user?.password,
    };

    const loginResponse = await loginToServer(userLoginData);

    if (loginResponse.status !== "success") {
      throw new Error(loginResponse?.message || "Login failed");
    }

    const loggedInUser: IUser = {
      phone: loginResponse.phone,
      token: loginResponse.token,
    };

    login(loggedInUser, "/");
    navigate("/login");
  };

  const handleForgetPassword = async (otp: string) => {
    const dataToPass = {
      phone: user?.phone,
      reason: "Change Password",
    };

    if (otp !== user?.otp) {
      throw new Error("Code is wrong!");
    }
    window.localStorage.setItem("tmpOtp", otp);
    navigate("/change-password", { state: dataToPass, replace: true });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (type === "Register") {
        await handleRegister(data.otp);
      } else if (type === "Forget Password") {
        await handleForgetPassword(data.otp);
      }
    } catch (error) {
      setDialog({
        title: "Error",
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const clickResendCode = async () => {
    const response = await getOtp(userRegisterData?.message?.phone);
    if (response.status == true) {
      // console.log("success");
    } else {
      setDialog({
        title: "Error",
        description: response?.message,
      });
    }
  };

  useEffect(() => {
    const timer: ReturnType<typeof setInterval> | undefined =
      counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : undefined;

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter]);

  const watchOtp = useWatch({
    control,
    name: "otp",
  });
  const memoizedOtp = useMemo(() => watchOtp, [watchOtp]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <AuthBgLayout bgClassName="h-screen" className="p-10">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[20px] text-gray-800">
            OTP Verification
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
        <p className="text-gray-800 text-sm mt-8">
          Enter 6 digits code we have sent to your mobile
        </p>
        <p className="text-gray-800 text-sm mb-4">
          number {userRegisterData?.phone}
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <OtpInput id="otp" />
            </div>
            <div className="text-left mt-[14px]">
              <a
                href="#"
                className="text-[14px] text-blue-100 font-medium hover:text-blue-50"
              >
                {counter === 0 ? null : format(counter)}
              </a>
            </div>
            {counter === 0 && (
              <div className="text-right mt-[14px] mb-[50px]">
                <p
                  onClick={clickResendCode}
                  className="text-[14px] text-blue-100 font-medium hover:text-blue-50 cursor-pointer"
                >
                  Resend Code!
                </p>
              </div>
            )}
            <Button type="submit" isDisabled={memoizedOtp?.length != 6}>
              Verify
            </Button>
          </form>
        </FormProvider>
      </AuthBgLayout>

      {dialog && (
        <ModalDialog
          title={dialog.title}
          bodyText={dialog.description}
          btnRight={{
            title: "Try Again",
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

export default Otp;
