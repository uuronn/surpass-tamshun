'use client'

import { useState } from 'react'
import { Sword, Shield, Zap, Flame } from 'lucide-react'
import { Button } from '../ui/button'

type ButtonType = '攻撃' | '回復' | 'わざ'

type BattleButtonsProps = {
  onAttack: () => void
  onHeal: () => void
  onSkill: () => void
}

export default function BattleButtons({ onAttack, onHeal, onSkill }: BattleButtonsProps) {
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null)

  const buttons: { type: ButtonType; icon: React.ReactNode; color: string }[] = [
    { type: '攻撃', icon: <Sword className="w-16 h-12" />, color: 'from-red-400 to-red-600' },
    { type: '回復', icon: <Shield className="w-16 h-12" />, color: 'from-blue-400 to-blue-600' },
    { type: 'わざ', icon: <Flame className="w-16 h-12" />, color: 'from-yellow-400 to-yellow-600' },
  ]

  const handleClick = (type: ButtonType) => {
    setSelectedButton(type)
    switch (type) {
      case '攻撃':
        onAttack()
        break
      case '回復':
        onHeal()
        break
      case 'わざ':
        onSkill()
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-12">
      {buttons.map(({ type, icon, color }) => (
        <Button
          key={type}
          className={`
            flex-1 flex items-center justify-center
            pr-8 py-8 rounded-full
            text-white font-bold text-2xl
            transition-all duration-300 ease-in-out
            transform hover:scale-105 hover:shadow-lg
            active:scale-95
            bg-gradient-to-r ${color}
            ${selectedButton === type ? 'ring-4 ring-white ring-opacity-60' : ''}
          `}
          onClick={() => handleClick(type)}
        >
          {icon}
          <span className="ml-2">{type}</span>
        </Button>
      ))}
    </div>
  )
}
