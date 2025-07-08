import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import "../../../css/createboard.css";

const { TextArea } = Input;

function Board() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name); // ✔️ @RequestPart("name")
    formData.append("description", description); // ✔️ @RequestPart("description")
    if (imageFile) {
      formData.append("image", imageFile); // ✔️ @RequestPart("image")
    }

    try {
      const token = localStorage.getItem("token"); // 필요시 토큰 사용

      const res = await axios.post("https://4c06b89555ee.ngrok.app/board/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 로그인 인증 필요 시
        },
      });

      console.log("등록 성공:", res.data);
      navigate("/");
    } catch (err) {
      console.error("등록 실패:", err);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="main_dox" style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <Link className="back_button" to="/">
        <Button style={{ borderRadius: "8px", padding: "10px 20px", fontWeight: "bold", backgroundcolor: "#009acc",}} >
          ←
        </Button>
      </Link>
      <form className="" onSubmit={handleSubmit}>
        <div style={{ margin: "2rem" }}>
          <label>제목:</label>
          <Input className="text_title" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>내용:</label>
          <TextArea
            className="text_label"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>이미지:</label>
          <Input
            type="file"
            accept="image/*"
            className="file_image"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <div style={{ 
              marginTop: "2rem", // 좀 더 아래로
              textAlign: "center", // 가운데 정렬
          }}
          >
          <Button
          type="primary"
          htmlType="submit"
          className="register_button"
          style={{ borderRadius: "8px", padding: "10px 20px", fontWeight: "bold", }} >
          등록
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Board;
