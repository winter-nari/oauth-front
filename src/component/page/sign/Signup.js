import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const API = 'https://4c06b89555ee.ngrok.app';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${API}/sign/signup`, {
        email,
        password,
        username,
        phone,
        age,
        sex,
        image,
      });
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패 : 정보를 다시 확인하세요.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Signup</h2>
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
      <input
        type="text"
        placeholder="이름 입력"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="tel"
        placeholder="전화번호 입력"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="number"
        placeholder="나이 입력"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="성별 입력"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="이미지 URL 입력 (선택)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button
        onClick={handleSignup}
        style={{ width: "100%", padding: 10 }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
