'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Loading({ message }: { message: string }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 3) % 3600)
    }, 16) // 約60FPSで更新

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
      <p className="text-white text-4xl">{message}</p>
      <br />
      <div
        className="w-48 h-48 rounded-full overflow-hidden shadow-lg"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.016s linear',
          boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.7)', // エフェクトの大きさを増やす
        }}
      >
        <Image
          src="/syuzo_sun.jpg"
          alt=""
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
