import { _get, _post, _patch, _delete } from "../utils/request";

const getExperienceLevels = async () => {
  try {
    const res = await _get(`/experienceLevel/getExperienceLevel`);
    const data = await res.json();

    return { docs: data.experienceLevel || [] };
  } catch (error) {
    console.error("Lỗi khi gọi API getExperienceLevel:", error);
    return { docs: [] };
  }
};

const createExperienceLevel = async (experienceLevel) => {
  const res = await _post(
    `/experienceLevel/postExperienceLevel`,
    experienceLevel
  );
  return await res.json();
};

const updateExperienceLevel = async (id, updatedData) => {
  const res = await _patch(
    `/experienceLevel/putExperienceLevel/${id}`,
    updatedData
  );
  return await res.json();
};

const deleteExperienceLevel = async (id) => {
  const res = await _delete(`/experienceLevel/deleteExperienceLevel/${id}`);
  return await res.json();
};

export {
  getExperienceLevels,
  createExperienceLevel,
  updateExperienceLevel,
  deleteExperienceLevel,
};
