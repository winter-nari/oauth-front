import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./me.css";

const API = 'https://4c06b89555ee.ngrok.app';

const Me = () => {
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      // 토큰을 로컬 스토리지에 저장
      const token = localStorage.getItem('token');

      //토큰을 세션 스토리지에 저장
      // const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setMember(response.data);
      } catch (error) {
        console.error('인증 실패:', error);
        localStorage.removeItem('token'); // 토큰 무효화
        navigate('/login');
      }
    };

    fetchMe();
  }, [navigate]);

  if (!member) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>내 정보</h2>
      <p><strong className="text_db">이메일:</strong> {member.email}</p>
      <p><strong className="text_db">이름:</strong> {member.username}</p>
      <p><strong className="text_db">전화번호:</strong> {member.phone}</p>
      <p><strong className="text_db">나이:</strong> {member.age}</p>
      <p><strong className="text_db">성별:</strong> {member.sex}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        style={{ marginTop: 20 }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Me;
