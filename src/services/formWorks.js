import { _get, _post, _patch, _delete } from "../utils/request";

// Lấy tất cả FormWorks
const getFormWorks = async () => {
  try {
    const res = await _get(`/formWork/getFormWork`);
    const data = await res.json();

    return { docs: data.formWork || [] };
  } catch (error) {
    console.error("Lỗi khi gọi API getFormWork:", error);
    return { docs: [] };
  }
};

const createFormWork = async (formWork) => {
  const res = await _post(`/formWork/postFormWork`, formWork);
  return await res.json();
};

const updateFormWork = async (id, updatedData) => {
  const res = await _patch(`/formWork/putFormWork/${id}`, updatedData);
  return await res.json();
};

const deleteFormWork = async (id) => {
  const res = await _delete(`/formWork/deleteFormWork/${id}`);
  return await res.json();
};

export { getFormWorks, createFormWork, updateFormWork, deleteFormWork };
