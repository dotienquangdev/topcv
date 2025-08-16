import { useDispatch, useSelector } from "react-redux";
import { getSystem } from "../services/system";
import { systemInfo } from "../actions/system";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../layouts/layout/layout";
import Main from "../layouts/main";
import JobsItemId from "../pages/jobs/jobsItem/jobsItem";
import { useEffect } from "react";
import CompaniesItem from "../pages/companies/companiesItem/companiesItem";
import Admin from "../layouts/admin";
import JobsAdmin from "../pages/Admin/jobs";
import CompaniesAdmin from "../pages/Admin/companies";
import CategoriesAdmin from "../pages/Admin/categories";
import UserAdmin from "../pages/Admin/user";
import Login from "../layouts/User/login/login";
import Register from "../layouts/User/Register/register";
import Auth from "../layouts/User/Auth/auth";

function AllRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSystem = async () => {
      const result = await getSystem();
      dispatch(systemInfo(result));
    };
    fetchSystem();
  }, [dispatch]); // ✅ thêm dispatch để hết warning

  const system = useSelector((state) => state.systemInfoReducer);

  return (
    <HelmetProvider>
      <Routes>
        <Route element={<Auth />}>
          <Route
            path="/userLogin"
            element={
              <Login title={`${system?.siteName || "Zing"}-Đăng Nhập`} />
            }
          ></Route>

          {/* <Route
            path="/userLogout"
            element={
              <Logout title={`${system?.siteName || "Zing"}-Đăng Nhập`} />
            }
          ></Route> */}
          <Route
            path="/userRegister"
            element={
              <Register title={`${system?.siteName || "Zing"}-Đăng ký`} />
            }
          ></Route>
          {/* <Route
            path="/userForgotPassword"
            element={
              <ForgotPassword
                title={`${system?.siteName || "Zing"}-Đổi mật khẩu`}
              />
            }
          ></Route> */}
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route
            path="/admin/jobs"
            element={
              <JobsAdmin title={`${system?.siteName || "TopCV"}-Admin-Jobs`} />
            }
          />
          <Route
            path="/admin/companies"
            element={
              <CompaniesAdmin
                title={`${system?.siteName || "TopCV"}-Admin-Companies`}
              />
            }
          />
          <Route
            path="/admin/categories"
            element={
              <CategoriesAdmin
                title={`${system?.siteName || "TopCV"}-Admin-CategoriesAdmin`}
              />
            }
          />
          <Route
            path="/admin/user"
            element={
              <UserAdmin
                title={`${system?.siteName || "TopCV"}-Admin-UserAdmin`}
              />
            }
          />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Main title={`${system?.siteName || "TopCV"}-Trang Chủ`} />
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <JobsItemId title={`${system?.siteName || "TopCV"}-CV Item`} />
            }
          />
          <Route
            path="/companies/:id"
            element={
              <CompaniesItem
                title={`${system?.siteName || "TopCV"}-Companies Item`}
              />
            }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default AllRouter;
