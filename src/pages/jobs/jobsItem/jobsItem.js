import { useEffect, useState } from "react";
import "./jobsItem.css";
import { useParams } from "react-router-dom";
import JobItem from "../jobs";
import { createJobsId } from "../../../services/jobs";
import { Helmet } from "react-helmet-async";

function JobsItemId({ title }) {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobsId = async () => {
      try {
        const dataJobsItem = await createJobsId(id);
        setJob(dataJobsItem.data);
      } catch (error) {
        console.error("Lỗi khi tải công việc:", error);
      }
    };

    if (id) fetchJobsId();
  }, [id]);

  const handleHover = (e, item) => {
    console.log("Hovered:", item.title);
  };

  const clearHover = () => {
    console.log("Hover cleared");
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
              💰 <strong>Lương:</strong>{" "}
              {job.salary_min > 100
                ? `${job.salary_min} - ${job.salary_max} $`
                : `${job.salary_min} - ${job.salary_max} triệu`}
            </div>
            <div className="meta-item">📍 {job.location}</div>
            <div className="meta-item">⌛ {job.experience_level}</div>
            <div className="meta-item">🕒 {job.job_type}</div>
            <div className="meta-item">
              🗓️ Hạn nộp hồ sơ: {new Date(job.deadline).toLocaleDateString()}
            </div>
          </div>

          <div className="job-buttons">
            <button className="btn-apply">Ứng tuyển ngay</button>
            <button className="btn-save">Lưu tin</button>
          </div>

          <div className="job-detail-section">
            <h3>Chi tiết tin tuyển dụng</h3>
            <p className="job-requirements">Yêu cầu : {job.requirements}</p>
            <p className="job-description">{job?.company_id.description}</p>
            <p className="job-description">{job?.company_id.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobsItemId;
