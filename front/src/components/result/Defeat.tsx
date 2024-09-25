import Image from 'next/image'

export default function Defeat() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Image
        src="/lose.png"
        alt="defeat"
        width={400}
        height={400}
        style={{
          marginBottom: '20px',
        }}
      />
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#0036FB',
        }}
      >
        君の負けだ！
      </h1>
    </div>
  )
}
