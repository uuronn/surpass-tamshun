'use client'

import '@/app/[userId]/globals.css'
import Defeat from '@/components/result/Defeat'
import Victory from '@/components/result/Victory'
import { Button } from '@/components/ui/button'
import { useRoomContext } from '@/context/RoomContext'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Result() {
  const { user } = useUserContext()
  const { currentRoom, setCurrentRoom, win } = useRoomContext()
  const router = useRouter()

  useEffect(() => {
    if (currentRoom)
      if (currentRoom.joinHp !== null && currentRoom.hostHp !== null) {
        if ((currentRoom.joinHp <= 0 || currentRoom.hostHp <= 0) && currentRoom.isConnected) {
          fetch('http://localhost/api/deleteRoom', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              room_id: currentRoom?.roomId,
            }),
          })

          setCurrentRoom(undefined)
        }
      }
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
      {win ? <Victory /> : <Defeat />}
      <Button
        onClick={() => router.push(`/${user?.userId}`)}
        type="submit"
        className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase fixed bottom-0 left-0"
        disabled={false}
      >
        戻る
      </Button>
    </div>
  )
}
