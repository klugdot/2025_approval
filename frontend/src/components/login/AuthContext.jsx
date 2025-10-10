import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const login = useCallback(async (inputId, inputPw) => {
    // DB에서 아이디, 로그인 일치 확인
    try {
      const res = await fetch("http://localhost:8080/approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: inputId,
          userPw: inputPw,
        }),
      });
      const data = await res.json();

      //   console.log("서버통신 결과", data.success);
      //   console.log("DB조회 결과1", data.userInfo);

      if (!data.success) {
        alert(`일치하는 회원정보를 찾을 수 없습니다.`);
        return;
      }

      setUser(data.userInfo);
      setIsLogin(true);

      return { success: true };
    } catch (error) {
      console.error("로그인 에러", error);
    }
  });

  const logout = useCallback(() => {
    setUser(null);
    setIsLogin(false);
  });

  const value = useMemo(
    () => ({
      user,
      isLogin,
      setIsLogin,
      login,
      logout,
    }),
    [user, isLogin, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
