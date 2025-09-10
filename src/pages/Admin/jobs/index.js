import { Helmet } from "react-helmet-async";
import "./jobs.css";
import { useEffect, useState } from "react";
import {
  createJobs,
  deleteJobById,
  updateJob,
  addJobs,
} from "../../../services/jobs";
import { createCompanies } from "../../../services/companies";
import { getCategories } from "../../../services/categories";
import NotificationBox from "../../../Notification/admin/Notification";
import { getFormWorks } from "../../../services/formWorks";
import { getWorkExperiences } from "../../../services/workExperiences";
import { getExperienceLevels } from "../../../services/experienceLevels";
import { getSkills } from "../../../services/skills";

function JobsAdmin({ title }) {
  const [notif, setNotif] = useState({ show: false, type: "", content: "" });

  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(8); // fallback mặc định

  const [editingJob, setEditingJob] = useState(null); // job đang sửa
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formWorks, setFormWorks] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [skills, setSkills] = useState([]);

  const [newJobs, setNewJobs] = useState({
    title: "",
    company_id: "",
    location: "",
    requirements: "",
    formWork_id: "",
    workExperience_id: "",
    experience_level_id: "",
    category_id: "",
    salary_min: "",
    salary_max: "",
    skills: [],
    status: "active",
    deleted: false,
    deadline: "",
    description: "",
    job_benefits: "",
    created_at: new Date(),
  });

  const showNotification = (content, type = "success") => {
    setNotif({ show: true, type, content });
    setTimeout(() => setNotif({ show: false, type: "", content: "" }), 3000);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await createJobs(page);
        setJobs(data.docs || []);
        setTotalPages(data.totalPages);
        if (data.limit) setPageSize(data.limit); // nếu API có trả về
        // console.log("data: ", data);
      } catch (error) {
        console.error("Lỗi khi tải jobs:", error);
        setJobs([]);
      }
    };
    fetchJobs();
  }, [page]);

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowEditPopup(true);
    handleViewDetails(false);
  };
  console.log("new Jobs: ", newJobs);
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const companyData = await createCompanies();
        setCompanies(companyData.docs || []);

        const categoryData = await getCategories();
        setCategories(categoryData.docs || []);

        const formWorksData = await getFormWorks();
        setFormWorks(formWorksData.docs || []);

        const workExperiencesData = await getWorkExperiences();
        setWorkExperiences(workExperiencesData.docs || []);

        const experienceLevelsData = await getExperienceLevels();
        setExperienceLevels(experienceLevelsData.docs || []);

        const skillData = await getSkills();
        setSkills(skillData.docs || []);
        // console.log("categoryData: ", categoryData);
        console.log("👉 Skills từ API:", skillData.docs);
        console.log("new skill123: ", setSkills);
      } catch (error) {
        console.error("Lỗi khi tải company/category:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleAddJobs = async () => {
    const min = parseFloat(newJobs.salary_min);
    const max = parseFloat(newJobs.salary_max);
    if (
      !newJobs.title?.trim() ||
      !newJobs.company_id ||
      !newJobs.location?.trim() ||
      !newJobs.requirements?.trim() ||
      !newJobs.formWork_id ||
      !newJobs.workExperience_id ||
      !newJobs.experience_level_id ||
      !newJobs.category_id ||
      !newJobs.deadline.trim() ||
      !newJobs.description.trim() ||
      !newJobs.job_benefits.trim() ||
      Number.isNaN(min) ||
      Number.isNaN(max)
    ) {
      console.log("⛔ Validate fail:", {
        title: newJobs.title?.trim(),
        company_id: newJobs.company_id,
        location: newJobs.location?.trim(),
        requirements: newJobs.requirements?.trim(),
        formWork_id: newJobs.formWork_id,
        workExperience_id: newJobs.workExperience_id,
        experience_level_id: newJobs.experience_level_id,
        category_id: newJobs.category_id,
        deadline: newJobs.deadline,
        description: newJobs.description,
        job_benefits: newJobs.job_benefits,
        min,
        max,
      });
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (min < 0) {
      alert("Lương tối thiểu phải >= 0");
      return;
    }
    if (max <= min) {
      alert("Lương tối đa phải > lương tối thiểu");
      return;
    }
    try {
      const res = await addJobs({
        ...newJobs,
        salary_min: min,
        salary_max: max,
        created_at: new Date().toISOString(),
      });
      if (res.success) {
        setShowAddModal(false);
        setNewJobs({});
        const updatedJobs = await createJobs(page);
        setJobs(updatedJobs.docs || []);
        showNotification("Đã thêm sản phẩm thành công!", "success");
      } else {
        alert(res.message || "Thêm thất bại");
      }
    } catch (error) {
      console.error("Lỗi thêm jobs:", error);
      alert("Có lỗi xảy ra khi thêm jobs");
    }
  };

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa công việc này?"
    );
    if (!confirmed) return;
    try {
      await deleteJobById(jobId); // gọi API xóa
      // Gọi lại dữ liệu sau khi xóa
      const data = await createJobs(page);
      setJobs(data.docs || []);
      setTotalPages(data.totalPages);
      showNotification("Đã xóa sản phẩm thành công!", "error");
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateJob(editingJob._id, editingJob); // gọi API sửa

      setShowEditPopup(false);
      const data = await createJobs(page);
      setJobs(data.docs || []);
      setTotalPages(data.totalPages);
      showNotification("Đã sửa sản phẩm thành công!", "warning");
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
    }
  };

  const handleViewDetails = (job) => {
    setViewingJob(job);
    setShowDetailPopup(true);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {notif.show && (
        <NotificationBox
          type={notif.type}
          onClose={() => setNotif({ show: false, type: "", content: "" })}
        >
          {notif.content}
        </NotificationBox>
      )}
      <button className="btn-add" onClick={() => setShowAddModal(true)}>
        + Thêm mới
      </button>
      <div className="jobsAdmin">
        {jobs.map((job, index) => (
          <div key={index} className="jobsAdmin-item item">
            <p>STT: {(page - 1) * pageSize + index + 1}</p>
            <img
              className="jobsAdmin-img item"
              src={job.company_id.logo_url}
              alt={job.title}
            />
            <p className="item item-title">{job.title}</p>
            <div className="item btn-item">
              <button onClick={() => handleViewDetails(job)}>Chi tiết</button>
              <button onClick={() => handleEdit(job)}>Sửa</button>
              <button onClick={() => handleDelete(job._id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* <AddJobs /> */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>Thêm công việc mới</h5>
            <form className="formAddJobs">
              {/* Tiêu đề */}
              <input
                placeholder="Tên công việc"
                type="text"
                value={newJobs.title}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, title: e.target.value })
                }
              />
              {/* Công ty */}
              <select
                value={newJobs.company_id}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, company_id: e.target.value })
                }
              >
                <option value="">-- Chọn công ty --</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {/* Địa điểm */}
              <input
                placeholder="Địa chỉ"
                type="text"
                value={newJobs.location}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, location: e.target.value })
                }
              />
              {/* Hình thức làm việc (FormWork) */}
              <select
                value={newJobs.formWork_id}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, formWork_id: e.target.value })
                }
              >
                <option value="">-- Chọn hình thức làm việc --</option>
                {formWorks.map((fw) => (
                  <option key={fw._id} value={fw._id}>
                    {fw.formWorkName}
                  </option>
                ))}
              </select>
              {/* Kinh nghiệm (WorkExperience) */}
              <select
                value={newJobs.workExperience_id}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, workExperience_id: e.target.value })
                }
              >
                <option value="">-- Chọn kinh nghiệm --</option>
                {workExperiences.map((we) => (
                  <option key={we._id} value={we._id}>
                    {we.label}
                  </option>
                ))}
              </select>
              {/* Cấp bậc (ExperienceLevel) */}
              <select
                value={newJobs.experience_level_id}
                onChange={(e) =>
                  setNewJobs({
                    ...newJobs,
                    experience_level_id: e.target.value,
                  })
                }
              >
                <option value="">-- Chọn cấp bậc --</option>
                {experienceLevels.map((el) => (
                  <option key={el._id} value={el._id}>
                    {el.experienceName}
                  </option>
                ))}
              </select>
              {/* Danh mục công việc */}
              <select
                value={newJobs.category_id}
                onChange={(e) =>
                  setNewJobs({
                    ...newJobs,
                    category_id: e.target.value,
                    skills: [],
                  })
                }
              >
                <option value="">-- Chọn danh mục công việc --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* Nếu đã chọn category thì show skills tương ứng */}
              {newJobs.category_id && skills.length > 0 && (
                <div className="skills-section">
                  <p>Chọn kỹ năng yêu cầu:</p>
                  {skills
                    .filter(
                      (skill) => skill.categoryId._id === newJobs.category_id
                    ) // chỉ lấy skill cùng category
                    .map((skill) => (
                      <label key={skill._id}>
                        <input
                          type="checkbox"
                          checked={newJobs.skills.includes(skill._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewJobs({
                                ...newJobs,
                                skills: [...newJobs.skills, skill._id],
                              });
                            } else {
                              setNewJobs({
                                ...newJobs,
                                skills: newJobs.skills.filter(
                                  (id) => id !== skill._id
                                ),
                              });
                            }
                          }}
                        />
                        {skill.name}
                      </label>
                    ))}
                </div>
              )}
              {/* Lương tối thiểu */}
              <input
                type="number"
                min="0"
                placeholder="salary_min"
                value={newJobs.salary_min}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, salary_min: Number(e.target.value) })
                }
              />
              {/* Lương tối đa */}
              <input
                type="number"
                min={Number(newJobs.salary_min) + 1}
                placeholder="salary_max"
                value={newJobs.salary_max}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, salary_max: Number(e.target.value) })
                }
              />
              <label>
                Ngày hết hạn:
                <input
                  type="date"
                  value={newJobs.deadline}
                  onChange={(e) =>
                    setNewJobs({ ...newJobs, deadline: e.target.value })
                  }
                />
              </label>

              {/* Yêu cầu descriptionc */}
              <textarea
                placeholder="Nhập Mô tả công việc..."
                value={newJobs.description}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, description: e.target.value })
                }
              />
              {/* Yêu cầu công việc */}
              <textarea
                placeholder="Nhập yêu cầu công việc..."
                value={newJobs.requirements}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, requirements: e.target.value })
                }
              />
              {/* Yêu cầu công việc */}
              <textarea
                placeholder="Quyền lợi..."
                value={newJobs.job_benefits}
                onChange={(e) =>
                  setNewJobs({ ...newJobs, job_benefits: e.target.value })
                }
              />
            </form>

            <div className="modal-buttons">
              <button onClick={handleAddJobs}>Thêm mới</button>
              <button onClick={() => setShowAddModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* // Sửa */}
      {showEditPopup && editingJob && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Sửa Công Việc</h2>
            <form>
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={editingJob.title}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, title: e.target.value })
                }
              />
              <label>Company Name:</label>
              <select
                value={editingJob.company_id}
                onChange={(e) =>
                  setNewJobs({ ...editingJob, company_id: e.target.value })
                }
              >
                {/* <option value="">-- Chọn công ty --</option> */}
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <label>Location:</label>
              <input
                type="text"
                value={editingJob.company_id.location}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    company_id: {
                      ...editingJob.company_id,
                      location: e.target.value,
                    },
                  })
                }
              />
              <label>Size:</label>
              <input
                type="text"
                value={editingJob.company_id.size}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    company_id: {
                      ...editingJob.company_id,
                      size: e.target.value,
                    },
                  })
                }
              />
              <label>requirements:</label>
              <input
                type="text"
                value={editingJob.requirements}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, requirements: e.target.value })
                }
              />
              <label>Job Type:</label>
              <input
                type="text"
                value={editingJob.job_type}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, job_type: e.target.value })
                }
              />
              <label>experience_level:</label>
              <input
                type="text"
                value={editingJob.experience_level}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    experience_level: e.target.value,
                  })
                }
              />

              <label>Categories Name:</label>
              <select
                value={editingJob.category_id}
                onChange={(e) =>
                  setNewJobs({ ...editingJob, category_id: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label>Lương tối thiểu:</label>
              <input
                type="number"
                value={editingJob.salary_min}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    salary_min: Number(e.target.value),
                  })
                }
              />
              <label>Lương tối đa:</label>
              <input
                type="number"
                value={editingJob.salary_max}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    salary_max: Number(e.target.value),
                  })
                }
              />
            </form>
            <div className="popup-actions">
              <button onClick={() => setShowEditPopup(false)}>Hủy</button>
              <button onClick={handleUpdate}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* // Chi tiết */}
      {showDetailPopup && viewingJob && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Chi Tiết Công Việc</h2>
            <div className="popup-detail">
              <p>
                <strong>Tiêu đề:</strong> {viewingJob.title}
              </p>
              <p>
                <strong>Company:</strong> {viewingJob.company_id.name}
              </p>
              <p>
                <strong>Categories:</strong> {viewingJob.category_id.name}
              </p>
              <p>
                <strong>Location:</strong> {viewingJob.company_id.location}
              </p>
              <p>
                <strong>Size:</strong> {viewingJob.company_id.size}
              </p>
              <p>
                <strong>Requirements:</strong> {viewingJob.requirements}
              </p>

              <p>
                <strong>FormWork:</strong>{" "}
                {viewingJob.formWork_id?.formWorkName}
              </p>
              <p>
                <strong>Kinh nghiệm:</strong>{" "}
                {viewingJob.workExperience_id?.label}
              </p>
              <p>
                <strong>Cấp bậc:</strong>{" "}
                {viewingJob.experience_level_id?.experienceName}
              </p>

              <p>
                <strong>Lương:</strong> {viewingJob.salary_min} -{" "}
                {viewingJob.salary_max}
              </p>
            </div>
            <div className="popup-actions">
              <button onClick={() => handleEdit(viewingJob)}>Sửa</button>
              <button onClick={() => setShowDetailPopup(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Phân trang */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
export default JobsAdmin;
