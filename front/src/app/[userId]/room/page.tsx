'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRoomContext } from '@/context/RoomContext'
import RoomCard from '@/components/room/RoomCard'
import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

export default function Room() {
  const [comment, setComment] = useState<string>('')
  const [rooms, setRooms] = useState<any[]>([])

  const { user } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const res = await fetch('http://3.114.106.137/api/getListRoom', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          console.error('Failed to fetch room list.')
          return
        }

        const data = await res.json()

        setRooms(data.roomList)
      } catch (error) {
        console.error('Error fetching room list:', error)
      }
    }

    fetchRoomList()
  }, [])

  // リストを再読み込みする関数
  const reloadRoomList = async () => {
    try {
      const res = await fetch('http://3.114.106.137/api/getListRoom', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        console.error('Failed to reload room list.')
        return
      }

      const data = await res.json()
      setRooms(data.roomList)
    } catch (error) {
      console.error('Error reloading room list:', error)
    }
  }

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
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '10px',
        }}
      >
        <Button
          onClick={() => router.push(`/${user?.userId}`)}
          type="submit"
          className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          戻る
        </Button>
      </div>
      <div
        style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {/* <input
          placeholder={'コメント'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={30}
          className="w-full min-h-[50px] p-4 pr-16 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ease-in-out shadow-lg hover:shadow-2xl  duration-300 "
        /> */}
        <RoomCreationButton />
        <Button
          onClick={reloadRoomList}
          type="submit"
          className="w-13 h-13 m-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          更新
        </Button>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // Change 'center' to 'flex-start'
              alignItems: 'center',
              overflowX: 'auto', // Ensure 'auto' is set for overflowX
              padding: '20px',
              height: '70%',
              width: '100%',
            }}
          >
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                roomID={room.id}
                roomName={room.host_user_name}
                roomLevel={
                  room.host_user_hit_point +
                  room.host_user_attack_power +
                  room.host_user_guard_power +
                  room.host_user_speed_power
                }
                roomUrl="/battleshuzo.png"
                roomComment={comment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const RoomCreationButton = () => {
  const { createRoom } = useRoomContext()

  return (
    <Button
      onClick={createRoom} // ボタンがクリックされた時にAPIを呼び出す
      className="createRoomButton hover:scale-110 hover:shadow-lg transition-transform duration-300 ease-in-out"
    >
      <Image src="/createRoom.png" alt="Create Room" width={100} height={100} />
    </Button>
  )
}
