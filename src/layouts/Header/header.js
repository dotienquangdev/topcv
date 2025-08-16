import "./header.css";
import "./headerUser.css";
import dataHeader from "../../data/dataHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [dataCategories, setDataCategories] = useState([]);
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái menu người dùng
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    fetch("http://localhost:9000/api/categories/getCategories")
      .then((res) => res.json())
      .then((data) => setDataCategories(data.categories || []))
      .catch((err) => console.error(err));
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  // Kiểm tra người dùng đăng nhập từ localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData); // Lưu thông tin người dùng vào state
    }
  }, []);
  // Hàm toggle mở/đóng menu người dùng
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    setUser(null); // Cập nhật lại state user là null
    setIsMenuOpen(false); // Đóng menu
  };

  return (
    <div className="header">
      <div className="header-topcv">
        <div className="topCV_img">
          <a href="/">
            <img
              src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
              alt="logo_company"
            />
          </a>
        </div>

        <div className="topCV_jobs">
          {dataHeader.map((item, index) => (
            <div className="topcv_jobs-item" key={item.id || index}>
              <span>{item.title}</span>
              <p>
                <i className="fa-solid fa-chevron-down chevron-down"></i>
              </p>

              <div className="topcv_jobs-dropdown">
                {item.child?.map((childItem, idx) => (
                  <div
                    key={childItem.id || idx}
                    className={childItem.className}
                  >
                    {childItem.title && <p>{childItem.title}</p>}
                    {/* Dynamic rendering of job categories */}
                    {childItem.id === "jobs_location" ? (
                      <div className="nav-subs dataCategories">
                        {dataCategories
                          .filter(
                            (cat) =>
                              cat.status === "active" ||
                              cat.status === "inactive"
                          )
                          .map((cat) => (
                            <div className="dataCategoriesText nav-icon nav-iconItems">
                              <a
                                key={cat._id}
                                href={`/viec-lam/${cat.slug}`}
                                className="nav-category-item"
                              >
                                {cat.name}
                              </a>
                              <p className="nav-icont_textP">
                                <i className="fa-solid fa-arrow-right"></i>
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      childItem.childJobs?.map((job, jobIdx) => (
                        <div
                          key={jobIdx}
                          className={job.className && "nav-sub"}
                        >
                          {job.title && <h3>{job.title}</h3>}
                          {job.childText?.map((text, textIdx) => (
                            <div
                              key={textIdx}
                              className={
                                text.className && "nav-icon nav-iconItems"
                              }
                            >
                              <div className="nav-icont_text">
                                {text.icon && (
                                  <img
                                    src={text.icon}
                                    alt={text.title}
                                    width={20}
                                  />
                                )}
                                <span>{text.title}</span>
                              </div>
                              <p className="nav-icont_textP">
                                <i className="fa-solid fa-arrow-right"></i>
                              </p>
                            </div>
                          ))}
                          {/* childNewCVItem (CV theo vị trí) */}
                          {job.childNewCVItem?.map((cv, cvIdx) => (
                            <div key={cvIdx} className="cv-item">
                              {cv.icon && (
                                <img src={cv.icon} alt={cv.title} width={20} />
                              )}
                              <span>{cv.title}</span>
                            </div>
                          ))}
                          {job.link && (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={job}
                            >
                              {job.link}
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="topCV_user">
          <div className="header-user">
            <div className="switch-container">
              <input
                type="checkbox"
                className="switch"
                id="themeSwitch"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <label htmlFor="themeSwitch">
                {theme === "dark" ? (
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </label>
            </div>

            <div className="headerUser-setting">
              <i className="fa-solid fa-gear"></i>
            </div>
            <div className="headerUser-id" onClick={toggleMenu}>
              <span>
                {user ? (
                  <img
                    className="user-menuImg"
                    src={user.avatar_url}
                    alt={user.fullName}
                  />
                ) : (
                  "Đăng nhập"
                )}
              </span>
            </div>

            {isMenuOpen && (
              <div className="user-menu">
                {user ? (
                  <div className="user-menu-title">
                    <img src={user.avatar_url} alt={user.fullName} />
                    <span>{user.fullName}</span>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </div>
                ) : (
                  <div className="user-menu-titleNone">
                    <p>Tài khoản: Chưa đăng nhập</p>
                    <Link to="/userLogin">
                      <button>Đăng nhập</button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
