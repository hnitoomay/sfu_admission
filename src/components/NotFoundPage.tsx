import { useNavigate } from "react-router-dom";
import Button from "./form/Button";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col space-y-8 items-center justify-center">
        <img src="/img/notFound.png" alt="Not Found" className="w-64 h-64" />
        <p className="text-black-100 text-2xl font-medium">
          Oops! This page was not found
        </p>
        <p className="text-gray-300 font-normal text-center">
          We're sorry, the page you requested could not be found. Please try
          again or return to the home page.
        </p>
      </div>

      <div className="mt-60">
        <Button
          className="w-auto bg-white-100 text-primary border border-primary rounded-xl"
          onClick={() => navigate("/", { replace: true })}
        >
          <KeyboardBackspaceOutlinedIcon className="mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
