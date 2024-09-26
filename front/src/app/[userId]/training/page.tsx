'use client'

import Chat from '@/components/common/Chat'
import Level from '@/components/training/Level'
import TrainingSkills from '@/components/training/TrainingSkills'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

type CurrentUser = {
  hit_point: number
  attack_power: number
  guard_power: number
  speed_power: number
  total_xp: number
}

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [reply, setReply] = useState<ReactNode>()
  const [loading, setLoading] = useState<boolean>(false)
  const [levelValue, setLevelValue] = useState<number>(0)
  const [attackValue, setAttackValue] = useState<number>(0)
  const [guardValue, setGuardValue] = useState<number>(0)
  const [hpValue, sethpValue] = useState<number>(0)
  const [speedValue, setSpeedValue] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<CurrentUser>()

  const { user } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const currentUser = await useUser(user.userId)
      setCurrentUser(currentUser.user)
    })()
  }, [])

  const editReply = (data: any): JSX.Element => {
    setCurrentUser({
      hit_point: data.hitPoint,
      attack_power: data.attackPower,
      guard_power: data.guardPower,
      speed_power: data.speedPower,
      total_xp: data.totalXp,
    })
    return (
      <div>
        <p>HP: {data.hitPoint}</p>
        <p>攻撃: {data.attackPower}</p>
        <p>防御: {data.guardPower}</p>
        <p>速さ: {data.speedPower}</p>
        <p> 経験値: {data.totalXp}</p>
        <p>最後のトレーニング時間: {new Date(data.lastTrainingTime).toLocaleString()}</p>
      </div>
    )
  }

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

      if (res.ok) {
        setReply(editReply(data.result))
        setLevelValue(data.result.totalXp)
        setAttackValue(data.result.attackPower)
        setGuardValue(data.result.guardPower)
        sethpValue(data.result.hitPoint)
        setSpeedValue(data.result.speedPower)
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
        {currentUser && (
          <Level
            level={currentUser.total_xp}
            hpValue={currentUser.hit_point}
            attackValue={currentUser.attack_power}
            guardValue={currentUser.guard_power}
            speedValue={currentUser.speed_power}
          />
        )}
      </div>
    </div>
  )
}
