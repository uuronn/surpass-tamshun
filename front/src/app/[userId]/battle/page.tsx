'use client'

import { useState, useRef, useEffect, use } from 'react'
import BattleButtons from '@/components/battle/BattleButtons'
import Unit, { UnitRef } from '@/components/battle/Unit'
import Log from '@/components/battle/Log'
import HealthBar from '@/components/battle/HealthBar'
import Status from '@/components/battle/Status'
import { useRoomContext } from '@/context/RoomContext'
import { UnitParameters } from '@/type/unit'
import { useUserContext } from '@/context/UserContext'
import { Room } from '@/type/room'
import { useRouter } from 'next/navigation'

export default function Battle() {
  const [loading, setLoading] = useState<boolean>(false)
  const [logging, setLogging] = useState<boolean>(false)
  const [turn, setTurn] = useState<boolean>(false)
  const [log, setLog] = useState<string[]>([])
  const [processing, setProcessing] = useState<boolean>(false)

  const { user } = useUserContext()
  const { currentRoom, prevRoom } = useRoomContext()

  const router = useRouter()

  const unitRefs = [useRef<UnitRef>(null), useRef<UnitRef>(null)]

  // ユニットの情報を取得
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

  // 攻撃ボタンのハンドラ
  const onAttack = async () => {
    setLoading(true)
    await fetch('http://localhost/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_id: currentRoom?.roomId,
        user_id: user?.userId,
      }),
    })
  }

  // 差分の計算
  const computeDifferences = (prevRoom: Room, currentRoom: Room): Difference[] => {
    const differences = []

    if (prevRoom.hostHp !== currentRoom.hostHp) {
      differences.push({
        unit: 'host',
        hpChange: currentRoom.hostHp && prevRoom.hostHp ? currentRoom.hostHp - prevRoom.hostHp : 0,
      } as Difference)
    }

    if (prevRoom.joinHp !== currentRoom.joinHp) {
      differences.push({
        unit: 'join',
        hpChange: currentRoom.joinHp && prevRoom.joinHp ? currentRoom.joinHp - prevRoom.joinHp : 0,
      } as Difference)
    }

    return differences
  }

  type Difference = {
    unit: 'host' | 'join'
    hpChange: number
  }

  // ログの生成
  const generateLogs = (differences: Difference[]) => {
    return differences.map((diff) => {
      const unitName = diff.unit === 'host' ? hostUnit.name : joinUnit.name
      if (diff.hpChange < 0) {
        return `${unitName}は${-diff.hpChange}のダメージを受けた！`
      } else if (diff.hpChange > 0) {
        return `${unitName}は${diff.hpChange}のHPを回復した！`
      }
      return ''
    })
  }

  // エフェクトの適用
  const applyEffects = async (differences: Difference[]) => {
    for (const diff of differences) {
      console.log(diff)
      const unitIndex = diff.unit === 'host' ? 0 : 1
      const enemyIndex = unitIndex === 0 ? 1 : 0
      console.log(unitIndex, enemyIndex)
      if (diff.hpChange < 0) {
        const direction = enemyIndex === 0 ? 'right' : 'left'
        await triggerEffect(enemyIndex, direction, 0)
        if (Math.abs(diff.hpChange) >= 20) {
          await triggerEffect(unitIndex, 'flame', 0)
        } else {
          await triggerEffect(unitIndex, 'fire', 0)
        }
        await triggerEffect(unitIndex, 'blink', diff.hpChange)
      } else if (diff.hpChange > 0) {
        await triggerEffect(unitIndex, 'heal', diff.hpChange)
      }
    }
  }

  // ユニットへのエフェクト適用関数
  const triggerEffect = async (unitIndex: number, effectName: keyof UnitRef, value: number) => {
    if (unitRefs[unitIndex].current && unitRefs[unitIndex].current[effectName]) {
      await unitRefs[unitIndex].current[effectName](value)
    }
  }

  // currentRoomの変更を監視
  useEffect(() => {
    if (!prevRoom || !currentRoom) {
      setTurn(currentRoom?.turn === user?.userId)
      return
    }

    const differences = computeDifferences(prevRoom, currentRoom)

    if (differences.length > 0 && !processing) {
      setProcessing(true)
      setLoading(false)
      console.log(differences)
      const newLogs = generateLogs(differences)
      setLog(newLogs)
      setLogging(true)

      // エフェクトを適用
      applyEffects(differences)

      // ログの表示が終わったら次の処理へ
      setTimeout(() => {
        setLogging(false)
        setTurn(currentRoom.turn === user?.userId)
        setProcessing(false)
      }, 2000 * newLogs.length) // ログ1つにつき2秒表示
    } else {
      // 自分のターンかどうかを更新
      setTurn(currentRoom.turn === user?.userId)
    }

    // if (currentRoom.isFinished) {
    //   router.push(`/${user?.userId}/result`)
    // }
  }, [currentRoom])

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
          <Log log={['通信中.....']} />
        ) : logging ? (
          <Log log={log} />
        ) : turn ? (
          <BattleButtons onAttack={onAttack} />
        ) : (
          <Log log={['相手のターン.....']} />
        )}
      </div>
    </div>
  )
}
