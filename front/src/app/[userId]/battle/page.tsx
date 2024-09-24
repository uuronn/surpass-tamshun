'use client'

import { useState } from 'react'
import Image from 'next/image'
import BattleButtons from '@/components/battle/ButtleButtons'

export default function Battle() {
  const [action, setAction] = useState('')

  const handleAction = (actionType: string) => {
    setAction(actionType)
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/battle.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* キャラクターの表示 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <Image src="/battleshuzo.png" alt="shuozo 1" height={300} width={300} />
        <Image src="/battleshuzo.png" alt="shuzo 2" height={300} width={300} />
      </div>

      {/* ボタン */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <BattleButtons />
        </div>
      </div>
    </div>
  )
}
