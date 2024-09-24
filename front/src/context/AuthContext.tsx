'use client'

import Loading from '@/components/login/Loading'
import Login from '@/components/login/Login'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

export type User = {
  userId: string
  email: string
  name: string
}

export type UserContextType = User

const AuthContext = createContext<{
  user: UserContextType | null | undefined
  fetchUser: () => void
  setUser: React.Dispatch<React.SetStateAction<UserContextType | null | undefined>>
}>({
  user: undefined,
  fetchUser: () => {},
  setUser: () => {},
})

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType | null | undefined>(undefined) //nullの時は未ログイン、undefinedの時はローディング中、userの時はログイン中

  useEffect(() => {
    setUser(undefined)
    const storedUser = localStorage.getItem('userId')
    console.log(storedUser, 'ログイン中のユーザー')
    if (storedUser) {
      setUser({
        userId: storedUser,
        email: '',
        name: '',
      })
    } else {
      setUser(null)
    }
  }, []) //ログイン状態を確認する処理

  const fetchUser = async () => {
    const storedUser = localStorage.getItem('userId')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
  } //ユーザー情報を取得する処理

  return (
    <AuthContext.Provider value={{ user, fetchUser, setUser }}>
      {user ? children : user === null ? <Login /> : <Loading message="ユーザー情報を取得中..." />}
    </AuthContext.Provider>
  )
}
