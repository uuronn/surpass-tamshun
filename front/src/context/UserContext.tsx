'use client'

import Loading from '@/components/login/Loading'
import Login from '@/components/login/Login'
import { User } from '@/type/user'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

const UserContext = createContext<{
  user: User | null | undefined
  fetchUser:() => void
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}>({
  user: undefined,
  fetchUser: () => {},
  setUser: () => {},
})

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined) //nullの時は未ログイン、undefinedの時はローディング中、userの時はログイン中

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
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {user ? children : user === null ? <Login /> : <Loading message="ユーザー情報を取得中..." />}
    </UserContext.Provider>
  )
}
