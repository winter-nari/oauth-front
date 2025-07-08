import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../css/allBoard.css"

const API = "https://4c06b89555ee.ngrok.app";

const AllBoard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰
        const res = await axios.get(`${API}/board`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("로그인이 필요합니다.");
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="contain" style={{ maxWidth: "800px", margin: "2rem auto", color: "#000" }}>
      <h2>전체 게시판</h2>
      <Link className="sotitle" to="/new">게시글 작성하기</Link>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              background: "#555",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3 className="post_title" >{post.name}</h3>
            <div className="description_box">
            <p className="description_text">
              {post.description.length > 100
                ? post.description.slice(0, 100) + "..."
                : post.description}
            </p>
            </div>
            {post.imageUrl && (
              <img src={`https://4c06b89555ee.ngrok.app${post.imageUrl}`} alt="게시판 이미지" style={{ maxWidth: "700px", marginTop: "2rem", display: "block", margin: "2rem auto" }} />
            )}
            <br />
            <Link to={`/board/${post.id}`} style={{ color: "#1890ff" }}>
              → 자세히 보기
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBoard;