'use client'

import { use, useEffect, useState } from 'react'
import '@/app/[userId]/globals.css'
import Defeat from '@/components/result/Defeat'
import Victory from '@/components/result/Victory'

export default function Result() {
  const [isVictory, setIsVictory] = useState<boolean>(false)

  useEffect(() => {
    setIsVictory(true)
  }, [])

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/home.png')`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isVictory ? <Victory /> : <Defeat />}
    </div>
  )
}
