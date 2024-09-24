'use client'

import { useState } from 'react'
import Image from 'next/image'
import Room from '@/components/room/Room'

export default function Battle() {
  const [action, setAction] = useState('')

  const handleAction = (actionType: string) => {
    setAction(actionType)
    console.log(actionType)
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/gakkouuranikoi.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* ボタン */}
      <div className="w-full flex items-center justify-center">
        <Room />
      </div>
    </div>
  )
}
