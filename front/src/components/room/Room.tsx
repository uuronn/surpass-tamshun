import React from 'react'
import Image from 'next/image'

const characters = [
  {
    id: 1,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 2,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 3,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 4,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 5,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 6,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
  {
    id: 7,
    name: '松岡修造',
    level: 100,
    comment: 'あきらめるなーーー！！',
    imageUrl: '/shuzohonki.png',
  },
]

const StatusBar = ({
  label,
  value,
  bgColor,
}: {
  label: string
  value: number
  bgColor: string
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px',
        borderRadius: '10px',
        marginBottom: '10px',
        color: 'white',
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{value}</span>
    </div>
  )
}

export default function Room() {
  return (
    <div
      style={{
        // height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TextInput />
        <RoomCreationButton />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'scroll',
          padding: '20px',
          height: '60vh',
          width: '70%',
        }}
      >
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  )
}

const RoomCreationButton = () => {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'grab',
      }}
    >
      <Image src="/gakkouuranikoi.png" alt="Create Room" width={80} height={80} />
    </button>
  )
}

const CharacterCard = ({ character }: { character: (typeof characters)[0] }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        margin: '10px',
        padding: '20px',
        width: '220px',
        flexShrink: 0,
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <LevelBadge level={character.level} />
      <Image
        src={character.imageUrl}
        alt={character.name}
        width={100}
        height={100}
        style={{ borderRadius: '50%' }}
      />
      <h3 style={{ margin: '10px 0', fontSize: '20px' }}>{character.name}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>{character.comment}</p>
      <div style={{ padding: '20px 0' }}>
        <StatusBar label="HP" value={100} bgColor="pink" />
        <StatusBar label="攻撃" value={80} bgColor="red" />
        <StatusBar label="防御" value={90} bgColor="blue" />
      </div>
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

const TextInput = () => {
  return (
    <textarea
      placeholder="Enter text here..."
      style={{
        width: '50%',
        height: '10vh',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '0.2rem solid #ccc',
        fontSize: '1rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
      }}
    />
  )
}
