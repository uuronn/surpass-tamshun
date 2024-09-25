'use client'

import { useState, useRef, useEffect } from 'react'
import BattleButtons from '@/components/battle/BattleButtons'
import Unit, { UnitRef } from '@/components/battle/Unit'
import Log from '@/components/battle/Log'
import HealthBar from '@/components/battle/HealthBar'
import Status from '@/components/battle/Status'

export default function Battle() {
  const [selecting, setSelecting] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const log = ['Player1がゲームに参加しました。', 'Player1がゲームに参加しました。']

  const unitCount = 2
  const unitRefs = Array.from({ length: unitCount }, () => useRef<UnitRef>(null))

  const triggerEffect = (unitIndex: number, effectName: keyof UnitRef, value: number) => {
    return unitRefs[unitIndex].current?.[effectName](value)
  }

  useEffect(() => {
    const runEffects = async () => {
      await triggerEffect(0, 'fire', 0)
      await triggerEffect(0, 'flame', 0)
      await triggerEffect(0, 'heal', 20)
      await triggerEffect(0, 'left', 0)
      await triggerEffect(0, 'right', 0)
      await triggerEffect(0, 'blink', -30)
    }
    runEffects()
  }, [])

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('/battle.png')`,
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
          justifyContent: 'center',
          alignItems: 'end',
          paddingBottom: '20px',
        }}
      >
        <Status name="ああああ" attack={20} defense={20} speed={20} xp={60} />
        <div className="flex flex-col items-center gap-10">
          <HealthBar currentHP={50} maxHP={100} />
          <Unit ref={unitRefs[0]} />
        </div>
        <div className="flex flex-col items-center gap-10">
          <HealthBar currentHP={50} maxHP={100} />
          <Unit ref={unitRefs[1]} />
        </div>
        <Status name="ああああああああああああ" attack={20} defense={20} speed={20} xp={1000} />
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
