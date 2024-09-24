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
  // 他のキャラクターを追加
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
    <div className="statusBar" style={{ backgroundColor: bgColor }}>
      <span>{label}</span>
      <span className="statusValue">{value}</span>
      <style jsx>{`
        .statusBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          border-radius: 10px;
          margin-bottom: 10px;
          color: white;
        }
        .statusValue {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default function Room() {
  return (
    <div className="container">
      <RoomCreationButton />

      {/* 水平スクロールコンテナ */}
      <div className="scrollContainer">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <style jsx>{`
        .container {
          width: 70%;
          height: 100vh;
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .scrollContainer {
          display: flex;
          overflow-x: scroll;
          padding: 20px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

const RoomCreationButton = () => {
  return (
    <button className="createRoomButton">
      <Image src="/gakkouuranikoi.png" alt="Create Room" width={100} height={100} />
      <style jsx>{`
        .createRoomButton {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}

const CharacterCard = ({ character }: { character: (typeof characters)[0] }) => {
  return (
    <div className="card">
      <LevelBadge level={character.level} />
      <Image
        src={character.imageUrl}
        alt={character.name}
        width={100}
        height={100}
        className="avatar"
      />
      <h3>{character.name}</h3>
      <p>{character.comment}</p>
      <div style={{ padding: '20px 0' }}>
        <StatusBar label="HP" value={100} bgColor="pink" />
        <StatusBar label="攻撃" value={80} bgColor="red" />
        <StatusBar label="防御" value={90} bgColor="blue" />
      </div>

      <style jsx>{`
        .card {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          margin: 10px;
          padding: 20px;
          width: 220px;
          flex-shrink: 0;
          text-align: center;
          position: relative;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .avatar {
          border-radius: 50%;
        }
        h3 {
          margin: 10px 0;
          font-size: 20px;
        }
        p {
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  )
}

const LevelBadge = ({ level }: { level: number }) => {
  return (
    <div className="levelBadge">
      Lv {level}
      <style jsx>{`
        .levelBadge {
          background-color: gray;
          color: white;
          border-radius: 25px;
          padding: 5px 20px;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
