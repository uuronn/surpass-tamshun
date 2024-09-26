import { useState, useEffect } from 'react'

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    setDisplayedText('') // テキストが変更されたときにリセット
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        if (onComplete) {
          onComplete()
        }
      }
    }, 80) // 表示速度を調整したい場合は、この値を変更してください

    return () => clearInterval(interval)
  }, [text, onComplete])

  return <div style={{ color: 'white', fontSize: '1.5rem' }}>{displayedText}</div>
}

export default TypewriterText
