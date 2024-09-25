import Image from 'next/image'

export default function Victory() {
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
        src="/home_syuzo.png"
        alt="Victory"
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
          color: '#FF0000',
        }}
      >
        勝利
      </h1>
    </div>
  )
}
