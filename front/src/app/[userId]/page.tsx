'use client'

import Chat from '@/components/common/Chat'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { useUser } from '@/hooks/useUser'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [reply, setReply] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { user, setUser } = useUserContext()

  const router = useRouter()

  const battleClicked = () => {
    router.push(`/${user?.userId}/room`)
  }

  const trainingClicked = () => {
    router.push(`/${user?.userId}/training`)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userId')
  }

  const [currentUser, setCurrentUser] = useState<{total_xp: number}>()


  useEffect(() => {
    if (!user) return
    ;(async () => {
      const currentUser = await useUser(user.userId)
      setCurrentUser(currentUser.user)
    })()
  }, [])

  const handleSubmit = async () => {
    if (message === '') {
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('http://3.114.106.137/api/openai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.userId, prompt: message }),
      })
      const data = await res.json()
      setReply(data.data)
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) return <div>ユーザーが存在しません</div>

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/home.png')`,
        backgroundSize: 'cover',
        display: 'flex',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '50%',
        }}
      >
        <Chat
          message={message}
          setMessage={setMessage}
          reply={reply}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <div
        style={{
          height: '100%',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <div className=" flex items-center space-x-4 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm">
          <div className="flex items-center space-x-3">
            {/* <User className="text-gray-300 h-8 w-8" /> */}
            <p className="text-2xl font-bold text-white pl-1">{user?.name}</p>
          </div>
          <div className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-inner">
            <span className="text-xl font-semibold text-white">
              経験値: {currentUser?.total_xp}
            </span>
          </div>
        </div>
        <Button
          onClick={battleClicked}
          type="submit"
          className="w-2/3 h-32  rounded-3xl bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          対戦
        </Button>
        <Button
          onClick={trainingClicked}
          type="submit"
          className="w-2/3 h-32 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          育成
        </Button>
        <div
          style={{
            position: 'absolute', // 追加: 絶対位置指定
            right: '10px', // 追加: 右から10pxの位置
            bottom: '10px', // 追加: 下から10pxの位置
          }}
        >
          <Button
            type="submit"
            className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase"
            disabled={false}
            onClick={logout}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  )
}
