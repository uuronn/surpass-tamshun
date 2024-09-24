import React from 'react'

// 定数として引数を定義
const HP_LABEL = 'HP'
const HP_VALUE = 120
const HP_COLOR = 'pink'

const ATTACK_LABEL = '攻撃'
const ATTACK_VALUE = 120
const ATTACK_COLOR = 'red'

const DEFENSE_LABEL = '防御'
const DEFENSE_VALUE = 120
const DEFENSE_COLOR = 'blue'

const SPEED_LABEL = '速さ'
const SPEED_VALUE = 120
const SPEED_COLOR = 'orange'

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

export default function Level() {
  return (
    <div
      style={{
        width: '300px',
        margin: '0 auto',
        // backgroundColor: 'white',
        borderRadius: '15px',
        // overflow: 'hidden',
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
        Lv 15
      </div>

      <div style={{ padding: '40px 20px' }}>
        {/* 定数を使ってStatusBarを呼び出す */}
        <StatusBar label={HP_LABEL} value={HP_VALUE} bgColor={HP_COLOR} />
        <StatusBar label={ATTACK_LABEL} value={ATTACK_VALUE} bgColor={ATTACK_COLOR} />
        <StatusBar label={DEFENSE_LABEL} value={DEFENSE_VALUE} bgColor={DEFENSE_COLOR} />
        <StatusBar label={SPEED_LABEL} value={SPEED_VALUE} bgColor={SPEED_COLOR} />
      </div>
    </div>
  )
}
