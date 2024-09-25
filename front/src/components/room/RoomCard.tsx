import React from 'react'
import Image from 'next/image'

type RoomProps = {
  name: string
  level: number
  url: string
  comment: string
}

export default function RoomCard({ name, level, url, comment }: RoomProps) {
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
      }}
    >
      <LevelBadge level={level} />
      <Image src={url} alt="" width={100} height={100} style={{ margin: 10 }} />
      <h3 style={{ margin: '10px 0', fontSize: '20px' }}>{name}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>{comment}</p>
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
