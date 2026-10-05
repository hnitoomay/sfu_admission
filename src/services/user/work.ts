import { UpdateWorkData } from "../../types/model"
import api from "../our_axios"

export async function addWork(data: UpdateWorkData) {
  const response = await api.post('/add/user/work-history', data).catch(error => error)
  return response.data
}

export async function updateWork(data: UpdateWorkData) {
  const response = await api
    .post("/edit/user/work-history", data)
    .catch((error) => error);
  return response.data;
}

export async function deleteWork(id: { work_id: string }) {
  const response = await api.post('/delete/user/work-history', id).catch(error => error);
  return response.data;
}