'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface OpponentData {
  roomId: string
  name: string
  level: number
  attack: number
  guard: number
  speed: number
  imageUrl: string
}

export default function Matched({ opponent }: { opponent: OpponentData }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const accept = async () => {
    await fetch('http://localhost/api/approvalJoinRoom', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: opponent.roomId,
      }),
    })
  }

  const reject = async () => {
    await fetch('http://localhost/api/deleteJoinUserRoom', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: opponent.roomId,
      }),
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
      <p className="text-white text-4xl mb-8">対戦相手が見つかりました！</p>
      <div
        className="w-80 bg-white rounded-xl overflow-hidden shadow-lg"
        style={{
          boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.7)',
        }}
      >
        <div className="p-4 ">
          <h2 className="text-2xl font-bold mb-2 ml-2">{opponent.name}</h2>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={opponent.imageUrl}
              alt={opponent.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2 mb-4 flex flex-col items-center">
            <StatusBar label="経験値" value={opponent.level} color="bg-purple-500" />
            <StatusBar label="攻撃力" value={opponent.attack} color="bg-red-500" />
            <StatusBar label="防御力" value={opponent.guard} color="bg-blue-500" />
            <StatusBar label="速さ" value={opponent.speed} color="bg-green-500" />
          </div>
          <div className="flex space-x-4">
            <button
              className="flex-1 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
              onClick={accept}
            >
              承諾
            </button>
            <button
              className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
              onClick={reject}
            >
              拒否
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatusBarProps {
  label: string
  value: number
  color: string
}

function StatusBar({ label, value, color }: StatusBarProps) {
  return (
    <div className="flex items-center">
      <span className="w-16 text-sm font-medium">{label}</span>
      <span className="w-8 text-sm font-medium text-right">{value}</span>
    </div>
  )
}
