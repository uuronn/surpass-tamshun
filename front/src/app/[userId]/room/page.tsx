'use client'

import { useState } from 'react'
import Image from 'next/image'
import Room from '@/components/room/Room'
import { Button } from '@/components/ui/button'
import { useRoomContext } from '@/context/RoomContext'

export default function Battle() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/room.png')`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <RoomCreationButton />
      <div className="w-full flex items-center justify-center">
        <Room />
      </div>
    </div>
  )
}

const RoomCreationButton = () => {
  const { createRoom } = useRoomContext()

  return (
    <Button
      onClick={() => createRoom()}
      className="createRoomButton hover:scale-110 hover:shadow-lg transition-transform duration-300 ease-in-out"
      style={{ position: 'fixed', top: '50px', right: '20px' }} // この行を追加
    >
      <Image src="/createRoom.png" alt="Create Room" width={100} height={100} />
    </Button>
  )
}
