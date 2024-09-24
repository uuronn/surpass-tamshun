'use client'

import Chat from '@/components/common/Chat'
import Level from '@/components/training/Level'
import TrainingSkills from '@/components/training/TrainingSkills'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [reply, setReply] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { user } = useUserContext()
  const router = useRouter()

  const handleSubmit = async () => {
    if (message === '') {
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('http://localhost/api/openai/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.userId, prompt: message }),
      })
      const data = await res.json()
      console.log(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('/home.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundImage: `url('/home.jpg')`,
          backgroundSize: 'cover',
          display: 'flex',
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', // 追加: 絶対位置指定
            left: '10px', // 追加: 右から10pxの位置
            bottom: '10px', // 追加: 下から10pxの位置
          }}
        >
          <Button
            onClick={() => router.push(`/${user?.userId}`)}
            type="submit"
            className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase"
            disabled={false}
          >
            戻る
          </Button>
        </div>
        <div
          style={{
            height: '100%',
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TrainingSkills />
        </div>
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
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Level />
        </div>
      </div>
    </div>
  )
}