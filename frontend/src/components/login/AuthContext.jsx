import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLogin, setIsLogin] = useState(() => {
    return sessionStorage.getItem("user") ? true : false;
  });

  const login = useCallback(async (inputId, inputPw) => {
    try {
      sessionStorage.clear();

      const res = await fetch(`${baseUrl}/approval`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: inputId,
          userPw: inputPw,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        alert(`일치하는 회원정보를 찾을 수 없습니다.`);
        return;
      }

      setUser(data.userInfo);
      setIsLogin(true);

      sessionStorage.setItem("user", JSON.stringify(data.userInfo));

      return { success: true };
    } catch (error) {
      console.error("로그인 에러", error);
    }
  });

  const logout = useCallback(() => {
    setUser(null);
    setIsLogin(false);

    sessionStorage.clear();
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
