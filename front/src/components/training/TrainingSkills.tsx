import { useState } from 'react'

interface MoveNameProps {
  name: string
  type: '攻撃' | '回復' | '防御'
}

const typeColors: Record<MoveNameProps['type'], string> = {
  攻撃: 'bg-red-500',
  回復: 'bg-green-500',
  防御: 'bg-blue-500',
}

function MoveName({ name, type }: MoveNameProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        flex items-center justify-between
        px-4 py-2 rounded-lg shadow-md
        transition-all duration-300 ease-in-out
        ${typeColors[type]} text-black
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-bold text-lg">{name}</span>
      <div className="flex items-center">
        <span className="mr-2 text-sm">{type}</span>
      </div>
    </div>
  )
}

export default function TrainingSkills() {
  const moves: MoveNameProps[] = [
    { name: 'よっしゃ！緊張してきた', type: '防御' },
    { name: '諦めちゃダメだ!', type: '回復' },
    { name: '燃えろ！', type: '攻撃' },
    { name: 'よっしゃ！緊張してきた', type: '防御' },
    { name: '諦めちゃダメだ!', type: '回復' },
    { name: '燃えろ！', type: '攻撃' },
    { name: 'よっしゃ！緊張してきた', type: '防御' },
    { name: '諦めちゃダメだ!', type: '回復' },
    { name: '燃えろ！', type: '攻撃' },
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
      <h1 className="text-3xl font-bold text-center mb-8">技</h1>

      {/* Scrollable container with a fixed height */}
      <div className="max-w-md mx-auto space-y-4" style={{ height: '300px', overflowY: 'auto' }}>
        {moves.map((move, index) => (
          <MoveName key={index} {...move} />
        ))}
      </div>
    </div>
  )
}
