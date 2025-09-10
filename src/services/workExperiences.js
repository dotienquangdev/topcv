import { _get, _post, _patch, _delete } from "../utils/request";

const getWorkExperiences = async () => {
  try {
    const res = await _get(`/workExperience/getWorkExperience`);
    const data = await res.json();
    return { docs: data.workExperience || [] };
  } catch (error) {
    console.error("Lỗi khi gọi API getWorkExperiences:", error);
    return { docs: [] };
  }
};

const createWorkExperience = async (workExperience) => {
  const res = await _post(`/workExperience/postWorkExperience`, workExperience);
  return await res.json();
};

const updateWorkExperience = async (id, updatedData) => {
  const res = await _patch(
    `/workExperience/putWorkExperience/${id}`,
    updatedData
  );
  return await res.json();
};

const deleteWorkExperience = async (id) => {
  const res = await _delete(`/workExperience/deleteWorkExperience/${id}`);
  return await res.json();
};

export {
  getWorkExperiences,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};
