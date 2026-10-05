// import axios from "axios";
import { DownloadBrochureVType } from "../lib/validation/DownloadBrochure";
import api from "./our_axios";
// import { BROCHURE_URL } from "../setting/API";

export async function downloadBrochure(data: DownloadBrochureVType) {
  const res = await api.post(`/download/brochure`, data).catch((error) => {
  // const res = await axios.post(BROCHURE_URL, data).catch((error) => {
    return error;
  });
  return res.data;
}
