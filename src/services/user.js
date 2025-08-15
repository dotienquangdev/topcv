import { _get, _post } from "../utils/request";

const postRegister = async ({ fullName, email, password }) => {
  try {
    const res = await _post(`/user/register`, { fullName, email, password });
    const result = await res.json();

    if (res.ok) {
      return {
        success: true,
        user: result.user,
      };
    } else {
      return {
        success: false,
        message: result.message || "Đăng ký không thành công",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "lỗi",
    };
  }
};

const getUser = async (page = 1, limit = 8, sort = "title", order = "asc") => {
  try {
    const res = await _get(
      `/user/getLogin?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );

    const data = (await res.json) ? await res.json() : res.data; // fallback nếu dùng fetch hoặc axios

    const result = data.user;

    if (data && data.docs) {
      return {
        docs: data.docs,
        totalPages: data.totalPages || 1,
        currentPages: data.currentPages || 1,
      };
    }

    if (Array.isArray(result)) {
      return {
        docs: result,
        totalPages: 1,
        currentPages: 1,
      };
    }

    return { docs: [], totalPages: 1, currentPages: 1 };
  } catch (error) {
    console.error("Lỗi khi gọi API user:", error);
    return { docs: [], totalPages: 1, currentPages: 1 };
  }
};

export { getUser };
