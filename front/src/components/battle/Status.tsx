import React from 'react'
import { Shield, Swords, Wind } from 'lucide-react'
import xpToLevel from '@/lib/xpToLevel'

type StatusProps = {
  name: string
  attack: number
  guard: number
  speed: number
  xp: number
}

export default function Status({ name, attack, guard, speed, xp }: StatusProps) {
  // const level = xpToLevel(xp)
  return (
    <div className="m-2 mb-12 pb-6 w-full max-w-72 mx-auto bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-white">
      <div className="p-3 space-y-6">
        <div className="flex justify-center items-center border-b-2 border-white pb-2 gap-2">
          <h2 className="text-sm font-bold text-white">{name}</h2>
          <span className="text-sm font-semibold text-white min-w-8">Lv{xp || 1}</span>
        </div>
        <div className="space-y-4">
          <StatusBar
            label="攻撃"
            value={attack}
            color="bg-red-600"
            icon={<Swords className="w-6 h-6" />}
          />
          <StatusBar
            label="防御"
            value={guard}
            color="bg-blue-600"
            icon={<Shield className="w-6 h-6" />}
          />
          <StatusBar
            label="速さ"
            value={speed}
            color="bg-green-600"
            icon={<Wind className="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  )
}

interface StatusBarProps {
  label: string
  value: number
  color: string
  icon: React.ReactNode
}

function StatusBar({ label, value, color, icon }: StatusBarProps) {
  return (
    <div className="flex justify-center items-center gap-6">
      <div className="flex items-center space-x-2">
        <div className={`${color} p-1 rounded`}>{icon}</div>
        <span className="text-2xl  text-white">{label}</span>
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
    </div>
  )
}
