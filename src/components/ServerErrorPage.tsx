import { FallbackProps } from "react-error-boundary";
import Button from "./form/Button";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

function ServerErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col space-y-8 items-center justify-center">
        <img
          src="/img/no-connection.png"
          alt="Not Found"
          className="w-64 h-64"
        />
        <p className="text-black-100 text-2xl font-medium">
          500 Server Error !
        </p>
        <p className="text-gray-300 font-normal text-center">
          {/* The server encountered an internal error or misconfiguration and was
          unable to complete your request. */}
          {error.message}
        </p>
      </div>

      <div className="mt-60">
        <Button
          className="w-auto bg-white-100 text-primary border border-primary rounded-xl"
          onClick={resetErrorBoundary}
        >
          <KeyboardBackspaceOutlinedIcon className="mr-2" />
          Reload
        </Button>
      </div>
    </div>
  );
}

export default ServerErrorPage;
