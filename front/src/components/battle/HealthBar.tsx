'use client'

import { useState, useEffect } from 'react'

interface HealthBarProps {
  currentHP: number
  maxHP: number
}

export default function HealthBar({ currentHP, maxHP }: HealthBarProps) {
  const [displayHP, setDisplayHP] = useState<number>(currentHP)

  useEffect(() => {
    // Animate HP change
    const animationDuration = 500 // ms
    const startTime = Date.now()
    const startHP = displayHP

    const animateHP = () => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / animationDuration, 1)

      setDisplayHP(Math.round(currentHP))

      if (progress < 1) {
        requestAnimationFrame(animateHP)
      }
    }

    animateHP()
  }, [currentHP])

  const percentage = (displayHP / maxHP) * 100
  const barColor =
    percentage > 50 ? 'bg-green-500' : percentage > 25 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="w-64 p-4 bg-gray-800 shadow-lg rounded-3xl">
      <div className="flex justify-between mb-1">
        <span className="text-white font-bold">HP</span>
        <span className="text-white">{`${displayHP} / ${maxHP}`}</span>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
