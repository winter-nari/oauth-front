import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://4c06b89555ee.ngrok.app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/sign/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/");
    } catch (error) {
      alert("로그인 실패: 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      {/* 뒤로가기 버튼 */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ marginBottom: 20 }}>← 뒤로가기</button>
      </Link>

      <h2>Login</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
        로그인
      </button>
    </div>
  );
};

export default Login;
