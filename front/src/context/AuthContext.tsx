"use client";

import Loading from "@/components/login/Loading";
import Login from "@/components/login/Login";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export type User = {
  uid: string;
  email: string;
  name: string;
};

export type UserContextType = User | null;

const AuthContext = createContext<{
  user: UserContextType | null | undefined;
  fetchUser: () => void;
}>({
  user: undefined,
  fetchUser: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType>({
    uid: "",
    email: "",
    name: "",
  }); //nullの時は未ログイン、undefinedの時はローディング中、userの時はログイン中
  const fetchUser = async () => {};
  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {user ? (
        children
      ) : user === null ? (
        <Login />
      ) : (
        <Loading message="ユーザー情報を取得中..." />
      )}
    </AuthContext.Provider>
  );
}
