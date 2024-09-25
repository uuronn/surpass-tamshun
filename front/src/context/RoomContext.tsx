'use client'

import Loading from '@/components/common/Loading'
import { Room } from '@/type/room'
import { useRouter } from 'next/navigation'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useUserContext } from './UserContext'
import Matched from '@/components/room/Matched'
import xpToLevel from '@/lib/xpToLevel'

const RoomContext = createContext<{
  currentRoom: Room | null | undefined
  getCurrentRoom: () => void
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

  const { user, getUser } = useUserContext()

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
    const roomData = data.room

    let joinUserName = currentRoom?.joinName || null

    if (currentRoom?.joinUserId !== null && currentRoom?.joinName == null) {
      joinUserName = (await getUser(roomData.join_user_id)).name
    }
    setCurrentRoom({
      roomId: roomData.id,
      hostUserId: roomData.host_user_id,
      hostName: user?.name || '名無しの修造',
      hostAttack: roomData.host_user_attack_power,
      hostGuard: roomData.host_user_guard_power,
      hostSpeed: roomData.host_user_speed_power,
      hostHp: roomData.host_user_hit_point,
      hostXp: roomData.host_xp,
      joinUserId: roomData.join_user_id,
      joinName: '相手の名前',
      joinAttack: roomData.join_user_attack_power,
      joinGuard: roomData.join_user_guard_power,
      joinSpeed: roomData.join_user_speed_power,
      joinHp: roomData.join_user_hit_point,
      joinXp: roomData.join_xp,
      isConnected: roomData.is_connect,
      isFinished: roomData.is_battle_finish,
    })
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
    const roomId = data.room.room_id
    const userId = user?.userId
    if (!userId) {
      return
    }
    const roomData: Room = {
      roomId: roomId,
      hostUserId: user?.userId,
      hostName: user?.name,
      hostAttack: 20,
      hostGuard: 10,
      hostSpeed: 10,
      hostHp: 100,
      hostXp: 200,
      joinUserId: null,
      joinName: null,
      joinAttack: null,
      joinGuard: null,
      joinSpeed: null,
      joinHp: null,
      joinXp: null,
      isConnected: false,
      isFinished: false,
    }

    setCurrentRoom(roomData)
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

  useEffect(() => {
    console.log('currentRoom:', currentRoom)
    if (currentRoom) {
      const intervalId = setInterval(() => {
        getCurrentRoom()
      }, 3000)

      return () => clearInterval(intervalId)
    }
  }, [currentRoom])

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const res = await fetch('http://localhost/api/getListRoom', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        const roomList = data.roomList
        const room = roomList
          .map((roomData: any) => ({
            roomId: roomData.id,
            hostUserId: roomData.host_user_id,
            hostName: 'ホスト',
            hostAttack: roomData.host_user_attack_power,
            hostGuard: roomData.host_user_guard_power,
            hostSpeed: roomData.host_user_speed_power,
            hostHp: roomData.host_user_hit_point,
            hostXp: roomData.host_xp,
            joinUserId: roomData.join_user_id,
            joinName: 'ゲスト',
            joinAttack: roomData.join_user_attack_power,
            joinGuard: roomData.join_user_guard_power,
            joinSpeed: roomData.join_user_speed_power,
            joinHp: roomData.join_user_hit_point,
            joinXp: roomData.join_xp,
            isConnected: roomData.is_connect,
            isFinished: roomData.is_battle_finish,
          }))
          .find((room: any) => room.hostUserId === user?.userId || room.joinUserId === user?.userId)
        if (room) {
          setCurrentRoom(room)
        }
      } catch (error) {
        console.error('Error fetching room list:', error)
      }
    }
    fetchRoomList()
  }, [])

  const isHost = currentRoom?.hostUserId === user?.userId
  const matched = !!currentRoom?.joinUserId
  const connected = currentRoom?.isConnected

  useEffect(() => {
    if (isHost && matched && connected) {
      router.push(`/${user?.userId}/battle`)
    }
  }, [isHost, matched, connected])

  return (
    <RoomContext.Provider value={{ currentRoom, getCurrentRoom, createRoom, joinRoom }}>
      {/* {!(currentRoom !== undefined && currentRoom?.isConnected == false) ? (
        children
      ) : currentRoom !== undefined &&
        currentRoom?.isConnected == false &&
        currentRoom?.hostUserId == user?.userId &&
        currentRoom?.joinUserId == null ? (
        <Loading message="対戦相手を検索中..." /> ? (
          currentRoom !== undefined &&
          currentRoom?.isConnected == false &&
          currentRoom?.hostUserId == user?.userId &&
          currentRoom?.joinUserId !== null ? (
            <Matched
              opponent={{
                name: currentRoom?.joinName || '名無しの修造',
                level: xpToLevel(currentRoom?.joinXp || 0),
                attack: currentRoom?.joinAttack || 0,
                guard: currentRoom?.joinGuard || 0,
                speed: currentRoom?.joinSpeed || 0,
                imageUrl: '/shuzohonki.png',
              }}
            />
          ) : null
        ) : null
      ) : (
        children
      )} */}
      {isHost && !matched ? (
        <Loading message="対戦相手を待っています..." />
      ) : isHost && matched && !connected ? (
        <Matched
          opponent={{
            name: currentRoom?.joinName || '名無しの修造',
            level: xpToLevel(currentRoom?.joinXp || 0),
            attack: currentRoom?.joinAttack || 0,
            guard: currentRoom?.joinGuard || 0,
            speed: currentRoom?.joinSpeed || 0,
            imageUrl: '/shuzohonki.png',
          }}
        />
      ) : (
        children
      )}
    </RoomContext.Provider>
  )
}
