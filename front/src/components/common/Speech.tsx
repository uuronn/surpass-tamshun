'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface SpeechBubbleProps {
  text: ReactNode
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
            : 'justify-start'
      }`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`relative max-w-xs md:max-w-sm bg-white p-4 rounded-3xl ${
              direction === 'right'
                ? 'rounded-br-none'
                : direction === 'left'
                  ? 'rounded-bl-none'
                  : ''
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center h-6" aria-label="読み込み中">
                <motion.span
                  className="w-2 h-2 bg-gray-400 rounded-full mr-1"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <motion.span
                  className="w-2 h-2 bg-gray-400 rounded-full mr-1"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            ) : (
              <div className="break-words">{text}</div>
            )}
            {(direction === 'left' || direction === 'right') && (
              <div
                className={`absolute w-4 h-4 bg-white transform rotate-45 ${
                  direction === 'right' ? '-right-2 bottom-3' : '-left-2 bottom-3'
                }`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
