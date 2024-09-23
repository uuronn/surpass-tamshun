'use client'

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
      <div style={{ height: '100%', widows: '50%' }}></div>
    </div>
  )
}
