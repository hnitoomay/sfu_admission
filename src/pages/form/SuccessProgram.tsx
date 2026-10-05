import { useNavigate } from "react-router-dom";
import Button from "../../components/form/Button";

function SuccessProgram() {

  const navigate = useNavigate();

  const clickBackToHome = () => {
    navigate('/')
  }
  return (
    <div className="flex items-center justify-center py-[70px]">
      <div className="flex-col sm:space-y-4 md:space-y-10">
        <div className="flex items-center justify-center">
          <img src="/img/success.png" alt="Success" />
        </div>

        <p className="text-gray-800 text-center text-xl font-bold">Thank You!</p>

        <p className="text-gray-800 text-[16px] font-md text-center">
          You have successfully applied for the programme! We will contact you
          as soon as we review your application.
        </p>

        <div className="flex items-center justify-center">
          <Button secondary onClick={clickBackToHome} className="w-full">
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessProgram;
