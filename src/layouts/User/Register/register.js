import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { Helmet } from "react-helmet-async";
import { postRegister } from "../../../services/user";

function Register({ title }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    const result = await postRegister({ fullName, email, password });

    if (result.success) {
      navigate("/userLogin");
    } else {
      setError(result.message || "Đăng ký thất bại, thử lại sau!");
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="userRegister">
        <h1 className="title">Đăng Ký</h1>
        <form className="userRegister-form" onSubmit={handleRegister}>
          <label>Tài khoản</label>
          <input
            className="userInputRegister"
            placeholder="Nhập tài khoản"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            className="userInputRegister"
            placeholder="Nhập email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mật khẩu</label>
          <input
            className="userInputRegister"
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Nhập lại mật khẩu</label>
          <input
            className="userInputRegister"
            placeholder="Nhập lại mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <div className="userRegister-button">
            <button type="submit">Đăng Ký</button>
            <span>
              Đã có tài khoản? <Link to={`/userLogin`}>Đăng Nhập</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
