import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Speech from './Speech'
import Image from 'next/image'
import FloatingImg from './FloatingImg'

type chatProps = {
  message: string
  setMessage: (message: string) => void
  reply: string
  handleSubmit: () => void
  loading: boolean
}

export default function Chat({ message, setMessage, reply, handleSubmit, loading }: chatProps) {
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
      <div
        style={{
          position: 'relative',
          width: '55%',
          minWidth: '350px',
          minHeight: '50%',
          height: '500px',
        }}
      >
        <FloatingImg src="/home_syuzo.png" />
      </div>
      <div className="flex items-center justify-center" style={{ height: '20%' }}>
        <Speech text={reply} isVisible={!!reply} loading={loading} />
      </div>
      <div className="mt-8 mb-8 w-full max-w-md">
        <Input
          className="w-full px-4 py-2 text-lg bg-opacity-80 bg-gray-800 text-white placeholder-gray-400 rounded-full border-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
          placeholder="メッセージを入力"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSubmit}
          disabled={loading}
        >
          送信
        </Button>
      </div>
    </div>
  )
}
