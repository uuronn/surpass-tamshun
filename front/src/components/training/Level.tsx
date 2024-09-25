import React from 'react'

interface StatusBarProps {
  label: string
  value: number
  bgColor: string
}

function StatusBar({ label, value, bgColor }: StatusBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: bgColor,
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        marginBottom: '10px',
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</span>
    </div>
  )
}

interface LevelProps {
  level: number
  hpValue: number
  attackValue: number
  guardValue: number
  speedValue: number
}

export default function Level({ level, hpValue, attackValue, guardValue, speedValue }: LevelProps) {
  return (
    <div
      style={{
        width: '300px',
        margin: '0 auto',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Level Badge */}
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
        経験値 {level}
      </div>

      <div style={{ padding: '40px 20px' }}>
        {/* 定数を使ってStatusBarを呼び出す */}
        <StatusBar label="HP" value={hpValue} bgColor="pink" />
        <StatusBar label="攻撃" value={attackValue} bgColor="red" />
        <StatusBar label="回復" value={guardValue} bgColor="blue" />
        <StatusBar label="速さ" value={speedValue} bgColor="green" />
      </div>
    </div>
  )
}
