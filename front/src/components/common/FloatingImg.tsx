import Image from 'next/image'

export default function FloatingImg({ src }: { src: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        style={{
          objectFit: 'contain',
          animation: 'sway 2s ease-in-out infinite', // ここでアニメーションを直接適用
        }}
      />
      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  )
}
