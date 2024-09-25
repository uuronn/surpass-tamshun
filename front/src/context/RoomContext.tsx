'use client'

import Loading from '@/components/login/Loading'
import { Room } from '@/type/room'
import { useRouter } from 'next/navigation'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useUserContext } from './UserContext'

const RoomContext = createContext<{
  currentRoom: Room | null | undefined
  getCurrentRoom:() => void
  createRoom: () => void
  joinRoom: (roomId: string) => void
}>({
  currentRoom: undefined,
  getCurrentRoom: () => {},
  createRoom: () => {},
  joinRoom: () => {},
})

export function useRoomContext() {
  return useContext(RoomContext)
}

export function RoomProvider({ children }: { children: ReactNode }) {
  const [currentRoom, setCurrentRoom] = useState<Room | null | undefined>(undefined)

  const { user } = useUserContext()

  const router = useRouter()

  // ゲームが終了するまで取得し続ける
  const getCurrentRoom = async (): Promise<void> => {
    const res = await fetch('http://localhost/api/getRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: currentRoom?.roomId,
      }),
    })
    const data = await res.json()
    console.log(data)
  }

  const createRoom = async (): Promise<void> => {
    const res = await fetch('http://localhost/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host_user_id: user?.userId,
      }),
    })
    const data = await res.json()
    console.log(data)
  }

  const joinRoom = async (roomId: string): Promise<void> => {
    const res = await fetch('http://localhost/api/joinRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: roomId,
        join_user_id: user?.userId,
      }),
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <RoomContext.Provider value={{ currentRoom, getCurrentRoom, createRoom, joinRoom }}>
      {children}
    </RoomContext.Provider>
  )
}
