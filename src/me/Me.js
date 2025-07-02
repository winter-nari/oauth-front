import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Me = () => {
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMember(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchMe();
  }, [navigate]);

  if (!member) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>내 정보</h2>
      <p>이메일: {member.email}</p>
      <p>이름: {member.username}</p>
      <p>전화번호: {member.phone}</p>
      <p>나이: {member.age}</p>
      <p>성별: {member.sex}</p>
    </div>
  );
};

export default Me;
