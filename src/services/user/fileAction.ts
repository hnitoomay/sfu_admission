import api from "../our_axios";

export async function addCertificateDoc(data: { certificate_doc: string }) {
  const response = await api
    .post("add/user/certificate", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => err);

  return response.data;
}

export async function deleteCertificateDoc(id: number) {
  const response = await api
    .post(`delete/user/certificate/${id}`)
    .catch((err) => err);

  return response.data;
}

export async function downloadCertificateDoc(url: string) {
  const response = await api
    .post(`download/user/certificate`, { url }, { responseType: "blob" })
    .catch((err) => err);

  return response;
}

export async function addEnglishDoc(data: { english_result: string }) {
  const response = await api
    .post("add/user/english_result", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => err);
  return response.data;
}

export async function deleteEngDoc(id: number) {
  const response = await api
    .post(`delete/user/english_result/${id}`)
    .catch((err) => err);

  return response.data;
}

export async function downloadEngDoc(url: string) {
  const response = await api
    .post(`download/user/english_result`, { url }, { responseType: "blob" })
    .catch((err) => err);

  return response;
}

export async function addRecDoc(data: { rec_letters: string }) {
  const response = await api
    .post("add/user/rec_letters", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => err);
  return response.data;
}

export async function deleteRecDoc(id: number) {
  const response = await api
    .post(`delete/user/rec_letters/${id}`)
    .catch((err) => err);

  return response.data;
}

export async function downloadRecDoc(url: string) {
  const response = await api
    .post(`download/user/rec_letter`, { url }, { responseType: "blob" })
    .catch((err) => err);

  return response;
}

