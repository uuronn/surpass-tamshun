import { useState } from 'react'

interface MoveNameProps {
  name: string
  type: '攻撃' | '回復' | '防御'
  level: number
}

const typeColors: Record<MoveNameProps['type'], string> = {
  攻撃: 'bg-red-500',
  回復: 'bg-green-500',
  防御: 'bg-blue-500',
}

function MoveName({ name, type, level }: MoveNameProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        flex flex-col items-start
        px-4 py-2 rounded-lg shadow-md
        transition-all duration-300 ease-in-out
        ${typeColors[type]} text-black
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 技の名前を表示 */}
      <span className="font-bold text-lg">{name}</span>

      {/* 技のタイプを表示 */}
      <div className="flex items-center">
        <span className="font-bold text-sm">{type}</span>
      </div>

      {/* レベルを表示 */}
      <div className="flex items-center">
        <span className="font-bold text-sm">{level}</span>
      </div>
    </div>
  )
}

export default function TrainingSkills() {
  const moves: MoveNameProps[] = [
    { name: 'よっしゃ！緊張してきた', type: '防御', level: 100 },
    { name: '諦めちゃダメだ!', type: '回復', level: 200 },
    { name: '燃えろ！', type: '攻撃', level: 150 },
    { name: 'よっしゃ！緊張してきた', type: '防御', level: 100 },
    { name: '諦めちゃダメだ!', type: '回復', level: 200 },
    { name: '燃えろ！', type: '攻撃', level: 150 },
    { name: 'よっしゃ！緊張してきた', type: '防御', level: 100 },
    { name: '諦めちゃダメだ!', type: '回復', level: 200 },
    { name: '燃えろ！', type: '攻撃', level: 150 },
  ]

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    
    </div>
  )
}
