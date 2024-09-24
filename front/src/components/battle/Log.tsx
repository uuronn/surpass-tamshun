import React, { useEffect, useRef } from 'react'
import TypewriterText from '../common/TypeWriter'

type LogProps = {
  log: string[]
}

export default function Log({ log }: LogProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [log])

  const previousLogs = log.slice(0, -1)
  const lastLog = log[log.length - 1]

  return (
    <div
      style={{ height: '90%', width: '100%' }}
      className="py-4 bg-black bg-opacity-70 border-2 border-white rounded-xl p-2 max-w-3xl mx-auto"
    >
      <div
        ref={scrollRef}
        className="h-full px-4 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
      >
        {previousLogs.map((text, index) => (
          <div key={index} style={{ color: 'white', fontSize: '2rem' }}>
            {text}
          </div>
        ))}
        {lastLog && (
          <TypewriterText
            key={lastLog + log.length} // キーを一意にするために変更
            text={lastLog}
          />
        )}
      </div>
    </div>
  )
}
