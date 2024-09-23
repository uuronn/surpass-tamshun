import { motion, AnimatePresence } from 'framer-motion'

interface SpeechBubbleProps {
  text: string
  isVisible: boolean
  direction?: 'left' | 'right' | 'up'
}

export default function Speech({ text, isVisible = false, direction = 'up' }: SpeechBubbleProps) {
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
            {/* <div
              className={`absolute w-4 h-4 bg-white transform rotate-45 ${
                direction === "right"
                  ? "-right-2 bottom-3"
                  : direction === "up"
                  ? "left-1/2 -top-2 translate-x-[-50%]"
                  : "-left-2 bottom-3" // "up" の場合のスタイルを追加
              }`}
            ></div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
