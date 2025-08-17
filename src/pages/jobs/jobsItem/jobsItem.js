import { useEffect, useState } from "react";
import "./jobsItem.css";
import { useParams, useNavigate } from "react-router-dom";
import { createJobsId } from "../../../services/jobs";
import { Helmet } from "react-helmet-async";

function JobsItemId({ title }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [userApply, setUserApply] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false); // ✅ thêm state thông báo login

  useEffect(() => {
    const fetchJobsId = async () => {
      try {
        // Lấy dữ liệu job
        const dataJobsItem = await createJobsId(id);
        setJob(dataJobsItem.data);

        // ✅ Lấy user từ localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
          setUserApply(JSON.parse(userData));
        } else {
          setUserApply(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải công việc:", error);
      }
    };

    if (id) fetchJobsId();
  }, [id]);

  // Khi bấm ứng tuyển
  const handleApplyClick = () => {
    if (!userApply) {
      // Nếu chưa login → hiện thông báo chứ chưa chuyển
      setShowLoginNotice(true);
      return;
    }
    setShowApplyModal(true);
  };

  if (!job) return <p>Đang tải dữ liệu...</p>;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="job-details-container">
        <div className="job-summary-card">
          <div className="job-header">
            <img
              className="job-logo"
              src={job?.company_id.logo_url}
              alt={job.title}
            />
            <div className="job-header-text">
              <h2 className="job-title">{job.title}</h2>
              <p className="company-name">{job?.company_id.name}</p>
            </div>
          </div>

          <div className="job-meta">
            <div className="meta-item">
              💰 Lương: {job.salary_min} - {job.salary_max}
            </div>
            <div className="meta-item">📍 {job.location}</div>
            <div className="meta-item">⌛ {job.experience_level}</div>
            <div className="meta-item">🕒 {job.job_type}</div>
            <div className="meta-item">
              🗓️ Hạn nộp hồ sơ: {new Date(job.deadline).toLocaleDateString()}
            </div>
          </div>

          <div className="job-buttons">
            <button className="btn-apply" onClick={handleApplyClick}>
              Ứng tuyển ngay
            </button>
            <button className="btn-save">Lưu tin</button>
          </div>
        </div>
      </div>

      {/* Modal Apply (khi đã login) */}
      {showApplyModal && userApply && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ứng tuyển {job.title}</h2>

            <div className="apply-section-information">
              <h4>Thông tin ứng viên</h4>
              <p>
                Họ và tên:
                <strong>{userApply.fullName}</strong>
              </p>
              <p>
                Email:
                <strong>{userApply.email}</strong>
              </p>
              <p>
                Số điện thoại:
                <strong>{userApply.phone}</strong>
              </p>
            </div>

            <div className="apply-section">
              <label>Chọn CV để ứng tuyển</label>
              <input type="file" accept=".pdf,.doc,.docx" />
            </div>

            <div className="apply-section">
              <label>Thư giới thiệu</label>
              <textarea placeholder="Viết thư giới thiệu ngắn gọn..."></textarea>
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowApplyModal(false)}
              >
                Hủy
              </button>
              <button className="btn-submit">Nộp hồ sơ ứng tuyển</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thông báo login (khi chưa login) */}
      {showLoginNotice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Bạn chưa đăng nhập</h3>
            <p>Vui lòng đăng nhập để tiếp tục ứng tuyển công việc này.</p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowLoginNotice(false)}
              >
                Hủy
              </button>
              <button
                className="btn-submit"
                onClick={() => navigate("/userLogin")}
              >
                Đăng nhập
              </button>
              <button
                className="btn-submit"
                onClick={() => navigate("/userRegister")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobsItemId;
