import FileSaver from "file-saver";
import nrcData from "../data/nrc.json";
import divisionData from "../data/division.json";
import moment from "moment";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function removeDuplicates(arr: any) {
  return [...new Set(arr)];
}

export function validateOption(value: any) {
  if (value === undefined) {
    return false;
  }
  if (value.value === undefined) {
    return false;
  }
  return true;
}

export const validFileExtensions: { [key: string]: string[] } = {
  type: ["pdf", "png", "jpeg", "jpg"],
};

export const MAX_FILE_SIZE = 2000000;
export function isValidFileType(fileName: string, fileType: string | number) {
  if (typeof fileType === "string") {
    if (fileType in validFileExtensions) {
      return (
        fileName &&
        validFileExtensions[fileType].indexOf(fileName.split(".").pop() || "") >
          -1
      );
    } else {
      return false;
    }
  }
  return true;
}

export function downloadPdfFile(pdfUrl: string, name: string) {
  FileSaver.saveAs(pdfUrl, name);
}

export const beforeSlash = (input: string) => input?.split("/")[0];

// Extract part between '/' and '('
export const afterSlash = (input: string) =>
  input?.substring(input.indexOf("/") + 1, input.indexOf("("));

// Extract part inside '()'
export const insideParentheses = (input: string) =>
  input?.substring(input.indexOf("(") + 1, input.indexOf(")"));

export const afterParaethseses = (input: string) =>
  input?.substring(input.indexOf(")") + 1);

// NRC
export const nrcCode = nrcData.data.map((nrc) => nrc.nrc_code);
const filterNrcCode = removeDuplicates(nrcCode);
export const NRCCODEARR = filterNrcCode.map((item) => ({
  label: item as string,
  value: parseInt(item as string),
}));
export const nrcPlace = nrcData.data.map((nrc) => nrc.name_en);

export const NRCPLACEARR = nrcPlace.map((item) => ({
  label: item as string,
  value: item,
}));

// Division
export const DIVISIONARR = divisionData.map((item) => ({
  label: item.name,
  value: item.id,
}));

export function getExtension(url: string, ext: string) {
  const regex = new RegExp(`\\${ext}$`, "i");
  const extensionMatch = url.match(regex);
  if (extensionMatch) {
    return extensionMatch[0];
  }
  return `No .${ext} extension found`;
}

export const padTime = (time: number) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

export const format = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${padTime(seconds)}`;
};

export const getFileExtension = (mimeType: string) => {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "application/pdf":
      return "pdf";
    default:
      return "file";
  }
};

export const downloadBlob = (blob: any, filenamePrefix: string) => {
  const fileExtension = getFileExtension(blob.type);
  const fileName = `${filenamePrefix}.${fileExtension}`;

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function createMarkup(dirty: any) {
  return { __html: dirty };
}

export const calculateDateDifference = (startDate: string, endDate: string) => {
    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    const duration = moment.duration(end.diff(start));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    return `${years == 0 ? "" : years} ${
      years == 0 ? "" : "years"
    } ${months}months ${days == 0 ? "" : `${days}days`}`;
  };
