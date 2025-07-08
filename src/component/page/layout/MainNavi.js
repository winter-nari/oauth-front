import "../../../css/mainNavi.css";
import { Link } from "react-router-dom";

function MainNavi() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="container">
      <div className="popover">
        <div className="content">
          <div className="nav">
            <div className="nav_item">
              <a href="/all">All</a>
            </div>
            <div className="nav_item">
              <a href="/new">Add New</a>
            </div>

            {/* 👇 로그인하지 않은 사용자만 로그인/회원가입 링크 보이게 */}
            {!isAuthenticated && (
              <>
                <div className="nav_item">
                  <a href="/login">Login</a>
                </div>
                <div className="nav_item">
                  <a href="/signup">SignUp</a>
                </div>
              </>
            )}

            {/* 👇 로그인한 사용자만 Me 메뉴 보이게 */}
            {isAuthenticated && (
              <div className="nav_item">
                <a href="/me">Me</a>
              </div>
            )}

            <div className="nav_item">
              <Link to="https://github.com/winter-nari/oauth-front" target="_blank" rel="noopener noreferrer">
                Develop Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavi;
