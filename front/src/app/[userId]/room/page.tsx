'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRoomContext } from '@/context/RoomContext'
import RoomCard from '@/components/room/RoomCard'

export default function Room() {
  const [comment, setComment] = useState<string>('')
  const [characters, setCharacters] = useState<any[]>([])

  // useEffectでルームリストを取得する
  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const res = await fetch('http://localhost/api/getListRoom', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!res.ok) {
          throw new Error('Failed to fetch room list')
        }
        const data = await res.json()
        setCharacters(data.rooms) // 取得したデータをcharactersにセット
      } catch (error) {
        console.error('Error fetching room list:', error)
      }
    }

    fetchRoomList()
  }, []) // コンポーネントの初期マウント時に一度だけ実行

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
        style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <input
          placeholder={'コメント'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={30}
          className="w-full min-h-[50px] p-4 pr-16 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ease-in-out shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        />
        <RoomCreationButton />
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
            {characters.map((char) => (
              <RoomCard
                key={char.id} // APIから取得したルームのidを使用
                name={char.name} // APIから取得したルームの名前
                level={char.level} // ルームのレベル
                url={char.imageUrl} // ルームの画像URL
                comment={char.comment} // ルームのコメント
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
      onClick={() => createRoom()}
      className="createRoomButton hover:scale-110 hover:shadow-lg transition-transform duration-300 ease-in-out"
    >
      <Image src="/createRoom.png" alt="Create Room" width={100} height={100} />
    </Button>
  )
}
