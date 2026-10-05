import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface DownloadPdfParams {
  onDownload: () => void;
}

function DownloadPdf(props: DownloadPdfParams) {
  const { onDownload } = props;
  return (
    <div
      id="download-btn"
      className="flex cursor-pointer md:space-x-2 hover:transition ease-in-out delay-150 hover:-translate-x-4 hover:scale-110 duration-300"
      onClick={onDownload}
    >
      <p className="sm:text-sm md:text-base text-blue-100 underline">
        Download as PDF
      </p>
      <FileDownloadOutlinedIcon
        fontSize="small"
        sx={{
          color: "#000000",
        }}
      />
    </div>
  );
}

export default DownloadPdf;
