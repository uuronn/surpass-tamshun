'use client'

import { useState, useRef, useEffect } from 'react'
import BattleButtons from '@/components/battle/BattleButtons'
import Unit, { UnitRef } from '@/components/battle/Unit'
import Log from '@/components/battle/Log'
import HealthBar from '@/components/battle/HealthBar'
import Status from '@/components/battle/Status'
import { useRoomContext } from '@/context/RoomContext'
import { UnitParameters } from '@/type/unit'
import { useUserContext } from '@/context/UserContext'
import { Room } from '@/type/room'

export default function Battle() {
  const [selecting, setSelecting] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [turn, setTurn] = useState<number>(0)
  const [prevRoom, setPrevRoom] = useState<Room>()

  const { user } = useUserContext()
  const { currentRoom } = useRoomContext()

  const hostUnit = {
    name: currentRoom?.hostName,
    attack: currentRoom?.hostAttack,
    guard: currentRoom?.hostGuard,
    speed: currentRoom?.hostSpeed,
    hp: currentRoom?.hostHp,
    maxHp: currentRoom?.hostMaxHp,
    xp: currentRoom?.hostXp,
  } as UnitParameters

  const joinUnit = {
    name: currentRoom?.joinName,
    attack: currentRoom?.joinAttack,
    guard: currentRoom?.joinGuard,
    speed: currentRoom?.joinSpeed,
    hp: currentRoom?.joinHp,
    maxHp: currentRoom?.joinMaxHp,
    xp: currentRoom?.joinXp,
  } as UnitParameters

  const onAttack = async () => {
    const res = await fetch('http://localhost/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: currentRoom?.roomId,
        user_id: user?.userId,
      }),
    })
    const data = await res.json()
  }

  const log = ['Player1がゲームに参加しました。', 'Player1がゲームに参加しました。']

  const unitCount = 2
  const unitRefs = Array.from({ length: unitCount }, () => useRef<UnitRef>(null))

  const triggerEffect = (unitIndex: number, effectName: keyof UnitRef, value: number) => {
    return unitRefs[unitIndex].current?.[effectName](value)
  }

  // useEffect(() => {
  //   const runEffects = async () => {
  //     await triggerEffect(0, 'fire', 0) // ユニット0にダメージ30を適用
  //     await triggerEffect(0, 'flame', 0) // ユニット0にダメージ50を適用
  //     await triggerEffect(0, 'heal', 20) // ユニット0にヒール20を適用
  //     await triggerEffect(0, 'left', 0) // 値が0なので数値は表示されない
  //     await triggerEffect(0, 'right', 0) // 同上
  //     await triggerEffect(0, 'blink', -30) // 同上
  //   }
  //   runEffects()
  // }, [])

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
        <Status
          name={hostUnit.name}
          attack={hostUnit.attack}
          guard={hostUnit.guard}
          speed={hostUnit.speed}
          xp={hostUnit.xp}
        />
        <div className="flex flex-col items-center gap-10">
          <HealthBar currentHP={hostUnit.hp} maxHP={hostUnit.maxHp} />
          <Unit ref={unitRefs[0]} />
        </div>
        <div className="flex flex-col items-center gap-10">
          <HealthBar currentHP={joinUnit.hp} maxHP={joinUnit.maxHp} />
          <Unit ref={unitRefs[1]} />
        </div>
        <Status
          name={joinUnit.name}
          attack={joinUnit.attack}
          guard={joinUnit.guard}
          speed={joinUnit.speed}
          xp={joinUnit.xp}
        />
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
        {loading ? (
          <Log log={['通信中...']} />
        ) : selecting ? (
          <BattleButtons onAttack={onAttack} />
        ) : (
          <Log log={log} />
        )}
      </div>
    </div>
  )
}
