import { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Login } from "./components/login/Login";
import { useAuth } from "./components/login/AuthContext";

function Layout() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const { isLogin, logout } = useAuth();

  // 로그인
  const handleLogin = () => {
    setShowLogin(true);
  };

  //로그아웃
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav className="bg-gray-600 text-white px-6 py-3 shadow-md">
          <ul className="flex justify-center space-x-6 text-3xl">
            {!isLogin ? (
              <li onClick={handleLogin} className="cursor-pointer">
                로그인
              </li>
            ) : (
              <>
                <li onClick={handleLogout} className="cursor-pointer">
                  로그아웃
                </li>
                <li
                  onClick={() => navigate("approvalList")}
                  className="cursor-pointer"
                >
                  결재목록
                </li>
                <li
                  onClick={() => navigate("addApproval")}
                  className="cursor-pointer"
                >
                  결재등록
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {showLogin && <Login setShowLogin={setShowLogin} />}
    </div>
  );
}

export default Layout;
