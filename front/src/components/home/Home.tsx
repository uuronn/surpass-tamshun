'use client'

import { Button } from '../ui/button'
import HomeChat from './HomeChat'

export default function Home() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundImage: `url('https://gakaisozai.up.seesaa.net/01247252N000000003/151351867304205811177_BG560a_1280.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '50%',
        }}
      >
        <HomeChat />
      </div>
      <div
        style={{
          height: '100%',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <Button
          type="submit"
          className="w-2/3 h-32  rounded-3xl bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          対戦
        </Button>
        <Button
          type="submit"
          className="w-2/3 h-32 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 uppercase"
          disabled={false}
        >
          育成
        </Button>
        <div
          style={{
            position: 'absolute', // 追加: 絶対位置指定
            right: '10px', // 追加: 右から10pxの位置
            bottom: '10px', // 追加: 下から10pxの位置
          }}
        >
          <Button
            type="submit"
            className="w-48 h-16 m-3 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 uppercase"
            disabled={false}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  )
}
