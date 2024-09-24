'use client'

import Loading from '@/components/login/Loading'
import Login from '@/components/login/Login'
import { User } from '@/type/user'
import { useRouter } from 'next/navigation'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

const UserContext = createContext<{
  user: User | null | undefined
  fetchUser:(userId: string) => Promise<User>
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}>({
  user: undefined,
  fetchUser: (userId: string) => new Promise<User>(() => {}),
  setUser: () => {},
})

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined) // nullの時は未ログイン、undefinedの時はローディング中、userの時はログイン中

  const router = useRouter()

  const fetchUser = async (userId: string): Promise<User> => {
    const res = await fetch(`http://localhost/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    const name = data.user.name
    const email = data.user.email
    const attack = data.user.attack
    const guard = data.user.guard
    const hp = data.user.hp
    const hotWords = data.user.hotWords
    const lastTraining = new Date(data.user.lastTraining)
    const xp = data.user.xp
    return { userId, name, email, attack, guard, hp, hotWords, lastTraining, xp } as User
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      setUser(undefined) // ローディング中
      const currentPage =
        window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
      const localUserId = localStorage.getItem('userId')
      if (localUserId !== null && localUserId !== undefined) {
        try {
          const userData = await fetchUser(localUserId) // fetchUserをawaitで待つ
          setUser(userData) // fetchしたユーザーデータをセット

          // ページに応じてリダイレクト
          if (currentPage === 'battle') {
            router.push(`/${localUserId}/battle`)
          } else if (currentPage === 'training') {
            router.push(`/${localUserId}/training`)
          } else {
            router.push(`/${localUserId}`)
          }
        } catch (error) {
          console.error('ユーザー情報の取得に失敗しました', error)
          setUser(null) // エラー時は未ログイン扱いにする
        }
      } else {
        setUser(null) // ユーザーIDがない場合は未ログイン
        router.push('/')
      }
    }

    checkLoginStatus() // 非同期関数を呼び出す
  }, [router]) // router依存を追加

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {user ? children : user === null ? <Login /> : <Loading message="ユーザー情報を取得中..." />}
    </UserContext.Provider>
  )
}
