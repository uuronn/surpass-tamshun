import React from 'react'
import Image from 'next/image'
import { useUserContext } from '@/context/UserContext'
import { useRoomContext } from '@/context/RoomContext'

type RoomProps = {
  roomID: string
  roomName: string
  roomLevel: number
  roomUrl: string
  roomComment: string
}

export default function RoomCard({ roomID, roomName, roomLevel, roomUrl, roomComment }: RoomProps) {
  const { joinRoom } = useRoomContext()

  return (
    <div
      className="transition-transform duration-300 hover:scale-105"
      style={{
        minWidth: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        margin: '20px',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        cursor: 'pointer',
      }}
      onClick={() => joinRoom(roomID)}
    >
      <LevelBadge level={roomLevel} />
      <Image src={roomUrl} alt="" width={100} height={100} style={{ margin: 10 }} />
      <h3 style={{ margin: '10px 0', fontSize: '20px' }}>{roomName}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>{roomComment}</p>
      <div style={{ padding: '20px 0' }}></div>
    </div>
  )
}

const LevelBadge = ({ level }: { level: number }) => {
  return (
    <div
      style={{
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: '25px',
        padding: '5px 20px',
        position: 'absolute',
        top: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
      }}
    >
      Lv {level}
    </div>
  )
}
