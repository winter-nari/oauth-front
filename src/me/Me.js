import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:8080'; // 백엔드 주소

const Me = () => {
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token'); // Login.jsx와 일치시킴

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
        console.error('인증 실패 또는 데이터 불러오기 실패:', error);
        navigate('/login');
      }
    };

    fetchMe();
  }, [navigate]);

  if (!member) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>내 정보</h2>
      <p><strong>이메일:</strong> {member.email}</p>
      <p><strong>이름:</strong> {member.username}</p>
      <p><strong>전화번호:</strong> {member.phone}</p>
      <p><strong>나이:</strong> {member.age}</p>
      <p><strong>성별:</strong> {member.sex}</p>
    </div>
  );
};

export default Me;
