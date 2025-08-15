import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../Header/header";
import "./admin.css";

function Admin() {
  return (
    <>
      <Header />
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <ul className="sidebar-menu">
            <a href="/admin">
              <li className="sidebar-item">📄 Tổng quan</li>
            </a>
            <a href="/admin/jobs">
              <li className="sidebar-item">📄 Jobs</li>
            </a>
            <a href="/admin/companies">
              <li className="sidebar-item">🏢 Companies</li>
            </a>
            <a href="/admin/categories">
              <li className="sidebar-item">📁 Categories</li>
            </a>
            <a href="/admin/user">
              <li className="sidebar-item">👤 Users</li>
            </a>
            <a href="/admin/report">
              <li className="sidebar-item">📊 Reports</li>
            </a>
          </ul>
        </aside>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
