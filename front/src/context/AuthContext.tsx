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
  const emptyUser: User = {
    uid: "",
    email: "",
    name: "",
  };
  const [user, setUser] = useState<UserContextType>(emptyUser); //nullの時は未ログイン、undefinedの時はローディング中、userの時はログイン中
  useEffect(() => {}, []); //ログイン状態を確認する処理
  const fetchUser = async () => {}; //ユーザー情報を取得する処理
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
