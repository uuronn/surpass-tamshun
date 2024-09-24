'use client'

import Loading from '@/components/login/Loading'
import Login from '@/components/login/Login'
import { User } from '@/type/user'
import { useRouter } from 'next/navigation'
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
  const [user, setUser] = useState<User | null | undefined>(undefined) //nullの時は未ログイン、u  ndefinedの時はローディング中、userの時はログイン中

  const router = useRouter()

  useEffect(() => {
    setUser(undefined)
    const currentPage = window.location.pathname.split('/')[-1]
    const localUserId = localStorage.getItem('userId')
    if (localUserId) {
      setUser({
        userId: localUserId,
        email: '',
        name: '',
      })
      if (currentPage === 'battle') {
        router.push(`/${localUserId}/battle`)
      } else if (currentPage === 'training') {
        router.push(`/${localUserId}/training`)
      } else {
        router.push(`/${localUserId}`)
      }
    } else {
      setUser(null)
      router.push('/')
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
      {/* {user ? children : user === null ? <Login /> : <Loading message="ユーザー情報を取得中..." />} */}
      {children}
    </UserContext.Provider>
  )
}
