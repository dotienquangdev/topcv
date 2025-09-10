import { _get, _post, _patch, _delete } from "../utils/request";

const getSkills = async (categoryId) => {
  try {
    const url = categoryId
      ? `/skill/getSkills?categoryId=${categoryId}`
      : `/skill/getSkills`;

    const res = await _get(url);

    // Fetch API => cần parse body
    const data = await res.json();

    console.log("👉 Raw data từ API111111:", data);
    console.log("👉 data.skills:", data.skills);

    return { docs: data.skills || [] };
  } catch (error) {
    console.error("Lỗi khi gọi API getSkills:", error);
    return { docs: [] };
  }
};

const createSkill = async (skill) => {
  const res = await _post(`/skill/postSkill`, skill);
  return await res.json();
};

const updateSkill = async (id, updatedData) => {
  const res = await _patch(`/skill/putSkill/${id}`, updatedData);
  return await res.json();
};

const deleteSkill = async (id) => {
  const res = await _delete(`/skill/deleteSkill/${id}`);
  return await res.json();
};

export { getSkills, createSkill, updateSkill, deleteSkill };
