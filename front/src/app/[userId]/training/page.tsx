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
  const [levelValue, setLevelValue] = useState<number>(0)
  const [attackValue, setAttackValue] = useState<number>(0)
  const [guardValue, setGuardValue] = useState<number>(0)
  const [hpValue, sethpValue] = useState<number>(0)
  const [speedValue, setSpeedValue] = useState<number>(0)

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

      if (data.success) {
        setReply(`
          Attack Power: ${data.result.attackPower}
          Guard Power: ${data.result.guardPower}
          Hit Point: ${data.result.hitPoint}
          Speed: ${data.result.speed}
          Total XP: ${data.result.totalXp}
          Last Training Time: ${new Date(data.result.lastTrainingTime).toLocaleString()}
        `)
        setLevelValue(data.result.totalXp)
        setAttackValue(data.result.attackPower)
        setGuardValue(data.result.guardPower)
        sethpValue(data.result.hitPoint)
        setSpeedValue(data.result.speed)
      } else {
        setReply('Failed to retrieve training data.')
      }
    } catch (error) {
      setReply('An error occurred while retrieving training data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/training.png')`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '10px',
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
        <Level
          level={levelValue}
          hpValue={hpValue}
          attackValue={attackValue}
          guardValue={guardValue}
          speedValue={speedValue}
        />
      </div>
    </div>
  )
}
