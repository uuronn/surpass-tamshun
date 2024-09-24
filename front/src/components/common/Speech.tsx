import { motion, AnimatePresence } from 'framer-motion'

interface SpeechBubbleProps {
  text: string
  isVisible: boolean
  direction?: 'left' | 'right' | 'up'
  loading?: boolean
}

export default function Speech({
  text,
  isVisible = false,
  direction = 'up',
  loading = false,
}: SpeechBubbleProps) {
  return (
    <div
      className={`flex ${
        direction === 'right'
          ? 'justify-end'
          : direction === 'up'
            ? 'justify-center'
            : 'justify-start' // "up" の場合のスタイルを追加
      }`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div className={`relative max-w-xs md:max-w-sm bg-white p-4 rounded-3xl`}>
            <p style={{ wordWrap: 'break-word' }}>{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
