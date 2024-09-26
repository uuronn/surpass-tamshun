'use client'

import Loading from '@/components/common/Loading'
import { Room } from '@/type/room'
import { useRouter } from 'next/navigation'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useUserContext } from './UserContext'
import Matched from '@/components/room/Matched'
import xpToLevel from '@/lib/xpToLevel'
import isEqual from 'lodash.isequal'
import { Button } from '@/components/ui/button'

const RoomContext = createContext<{
  currentRoom: Room | null | undefined
  setCurrentRoom:(room: Room | undefined) => void
  getCurrentRoom: () => void
  prevRoom: Room | null | undefined
  createRoom: () => void
  joinRoom: (roomId: string) => void
}>({
  currentRoom: undefined,
  setCurrentRoom: () => {},
  getCurrentRoom: () => {},
  prevRoom: undefined,
  createRoom: () => {},
  joinRoom: () => {},
})

export function useRoomContext() {
  return useContext(RoomContext)
}

export function RoomProvider({ children }: { children: ReactNode }) {
  const [prevRoom, setPrevRoom] = useState<Room | null | undefined>(undefined)
  const [currentRoom, setCurrentRoom] = useState<Room | null | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>()
  const [win, setWin] = useState<boolean>(false)

  const { user } = useUserContext()

  const router = useRouter()

  const getCurrentRoom = async (): Promise<void> => {
    if (!isHost && !currentRoom?.joinUserId) {
      setCurrentRoom(undefined)
    }
    // 前回の部屋情報を保持
    const prevRoomData = currentRoom ? { ...currentRoom } : null

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
    console.log(roomData)

    // 新しい部屋情報を作成
    const newRoom: Room = {
      roomId: roomData.id,
      hostUserId: roomData.host_user_id,
      hostName: roomData.host_user_name,
      hostAttack: roomData.host_user_attack_power,
      hostGuard: roomData.host_user_guard_power,
      hostSpeed: roomData.host_user_speed_power,
      hostHp: roomData.host_user_hit_point,
      hostMaxHp: roomData.host_user_max_hit_point,
      hostXp: roomData.host_user_xp,
      joinUserId: roomData.join_user_id,
      joinName: roomData.join_user_name,
      joinAttack: roomData.join_user_attack_power,
      joinGuard: roomData.join_user_guard_power,
      joinSpeed: roomData.join_user_speed_power,
      joinHp: roomData.join_user_hit_point,
      joinMaxHp: roomData.join_user_max_hit_point,
      joinXp: roomData.join_user_xp,
      turn: roomData?.currentTurnUser,
      isConnected: roomData.is_connect,
      isFinished: roomData.is_battle_finish,
    }

    // 差分の検出
    const isDifferent = !isEqual(prevRoomData, newRoom)

    if (!prevRoom) {
      setPrevRoom(newRoom)
    }

    if (isDifferent) {
      setCurrentRoom(newRoom)
      setPrevRoom(prevRoomData)
    }

    if (loading) setLoading(false)
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
    const roomId = data.room.id
    const userId = user?.userId
    if (!userId) {
      return
    }
    const roomData: Room = {
      roomId: roomId,
      hostUserId: user?.userId,
      hostName: user?.name,
      hostAttack: user?.attack,
      hostGuard: user?.guard,
      hostSpeed: user?.speed,
      hostHp: user?.hp,
      hostMaxHp: user?.hp,
      hostXp: user?.xp,
      joinUserId: null,
      joinName: null,
      joinAttack: null,
      joinGuard: null,
      joinSpeed: null,
      joinHp: null,
      joinXp: null,
      joinMaxHp: null,
      turn: null,
      isConnected: false,
      isFinished: false,
    }

    setCurrentRoom(roomData)
  }
  const joinRoom = async (roomId: string): Promise<void> => {
    await fetch('http://localhost/api/joinRoom', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: roomId,
        join_user_id: user?.userId,
      }),
    })

    const roomData: Room = {
      roomId: roomId,
      hostUserId: null,
      hostName: null,
      hostAttack: null,
      hostGuard: null,
      hostSpeed: null,
      hostHp: null,
      hostMaxHp: null,
      hostXp: null,
      joinUserId: null,
      joinName: null,
      joinAttack: null,
      joinGuard: null,
      joinSpeed: null,
      joinHp: null,
      joinXp: null,
      joinMaxHp: null,
      turn: null,
      isConnected: false,
      isFinished: false,
    }

    setCurrentRoom(roomData)
  }

  useEffect(() => {
    if (currentRoom) {
      const intervalId = setInterval(() => {
        getCurrentRoom()
      }, 2000)

      return () => clearInterval(intervalId)
    }
  }, [currentRoom])

  useEffect(() => {
    const fetchRoomList = async () => {
      setLoading(true)
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
            hostName: roomData.host_user_name,
            hostAttack: roomData.host_user_attack_power,
            hostGuard: roomData.host_user_guard_power,
            hostSpeed: roomData.host_user_speed_power,
            hostHp: roomData.host_user_hit_point,
            hostXp: roomData.host_xp,
            joinUserId: roomData.join_user_id,
            joinName: roomData.join_user_name,
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
        } else {
          setLoading(false)
          router.push(`/${user?.userId}`)
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
    if (matched && connected) {
      router.push(`/${user?.userId}/battle`)
    }
  }, [isHost, matched, connected])

  const back = async () => {
    await fetch('http://localhost/api/deleteRoom', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: currentRoom?.roomId,
      }),
    })
    setCurrentRoom(undefined)
    router.push(`/${user?.userId}/room`)
  }

  return (
    <RoomContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
        getCurrentRoom,
        prevRoom,
        createRoom,
        joinRoom,
      }}
    >
      {isHost && !matched ? (
        <>
          <Button
            onClick={back}
            type="submit"
            className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase fixed bottom-0 left-0"
            disabled={false}
          >
            戻る
          </Button>
          <Loading message="対戦相手を待っています..." />
        </>
      ) : isHost && matched && !connected ? (
        <Matched
          opponent={{
            roomId: currentRoom?.roomId,
            name: currentRoom?.joinName || '名無しの修造',
            level: xpToLevel(currentRoom?.joinXp || 1),
            attack: currentRoom?.joinAttack || 0,
            guard: currentRoom?.joinGuard || 0,
            speed: currentRoom?.joinSpeed || 0,
            imageUrl: '/shuzohonki.png',
          }}
        />
      ) : !isHost && !connected && !!currentRoom ? (
        <Loading message="相手の承諾を待っています..." />
      ) : loading ? (
        <Loading message="対戦情報を取得しています..." />
      ) : (
        children
      )}
    </RoomContext.Provider>
  )
}
