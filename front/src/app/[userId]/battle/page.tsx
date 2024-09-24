'use client'

import { useState, useRef, useEffect } from 'react'
import BattleButtons from '@/components/battle/BattleButtons'
import Unit, { UnitRef } from '@/components/battle/Unit'
import Log from '@/components/battle/Log'
import HealthBar from '@/components/battle/HealthBar'

export default function Battle() {
  const [selecting, setSelecting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const log = ['Player1がゲームに参加しました。', 'Player1がゲームに参加しました。']

  const unitCount = 2
  const unitRefs = Array.from({ length: unitCount }, () => useRef<UnitRef>(null))

  const triggerEffect = (unitIndex: number, effectName: keyof UnitRef, value: number) => {
    return unitRefs[unitIndex].current?.[effectName](value)
  }

  useEffect(() => {
    const runEffects = async () => {
      await triggerEffect(0, 'fire', 0) // ユニット0にダメージ30を適用
      await triggerEffect(0, 'flame', 0) // ユニット0にダメージ50を適用
      await triggerEffect(0, 'heal', 20) // ユニット0にヒール20を適用
      await triggerEffect(0, 'left', 0) // 値が0なので数値は表示されない
      await triggerEffect(0, 'right', 0) // 同上
      await triggerEffect(0, 'blink', 30) // 同上
    }
    runEffects()
  }, [])

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/battle.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '70%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'end',
          paddingBottom: '20px',
        }}
      >
        {unitRefs.map((unitRef, index) => (
          <div key={index} className="flex flex-col items-center gap-10">
            <HealthBar currentHP={50} maxHP={100} />
            <Unit ref={unitRef} />
          </div>
        ))}
      </div>
      <div
        style={{
          height: '30%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {selecting ? <BattleButtons /> : <Log log={log} />}
      </div>
    </div>
  )
}
