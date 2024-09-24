import { useState, useImperativeHandle, forwardRef } from 'react'
import Image from 'next/image'

type EffectType = 'fire' | 'flame' | 'heal' | 'left' | 'right' | 'blink'

type Effect = {
  type: EffectType
  value: number // 数値の値を追加
} | null

export type UnitRef = {
  fire: (value: number) => Promise<void>
  flame: (value: number) => Promise<void>
  heal: (value: number) => Promise<void>
  left: (value: number) => Promise<void>
  right: (value: number) => Promise<void>
  blink: (value: number) => Promise<void>
}

export default forwardRef<UnitRef>(function Unit(props, ref) {
  const [effect, setEffect] = useState<Effect>(null)

  // エフェクト関数の実装
  const fire = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'fire', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 800)
    })
  }

  const flame = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'flame', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 580)
    })
  }

  const heal = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'heal', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 1200)
    })
  }

  const left = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'left', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 500)
    })
  }

  const right = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'right', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 500)
    })
  }

  const blink = (value: number) => {
    return new Promise<void>((resolve) => {
      setEffect({ type: 'blink', value })
      setTimeout(() => {
        setEffect(null)
        resolve()
      }, 900)
    })
  }

  // 外部から関数を呼び出せるように設定
  useImperativeHandle(ref, () => ({
    fire,
    flame,
    heal,
    left,
    right,
    blink,
  }))

  return (
    <>
      <div
        className={`unit-container ${effect?.type || ''}`}
        style={{
          position: 'relative',
          width: '45%',
          minWidth: '350px',
          minHeight: '40%',
          height: '25rem',
        }}
      >
        {/* ユニットの画像 */}
        <div className="unit-image">
          <Image
            src="/battleshuzo.png"
            alt=""
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        {/* エフェクトの表示 */}
        {effect?.type === 'fire' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <Image
              src="/fire.gif"
              alt=""
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        )}
        {/* 他のエフェクトも同様に表示 */}
        {/* 数値の表示 */}
        {effect && effect.value !== 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white', // 文字の色を白に設定
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: `
      -1px -1px 0 ${effect.value > 0 ? 'green' : 'red'},
      1px -1px 0 ${effect.value > 0 ? 'green' : 'red'},
      -1px 1px 0 ${effect.value > 0 ? 'green' : 'red'},
      1px 1px 0 ${effect.value > 0 ? 'green' : 'red'},
      -2px -2px 0 ${effect.value > 0 ? 'green' : 'red'},
      2px -2px 0 ${effect.value > 0 ? 'green' : 'red'},
      -2px 2px 0 ${effect.value > 0 ? 'green' : 'red'},
      2px 2px 0 ${effect.value > 0 ? 'green' : 'red'}
    `,
              pointerEvents: 'none',
            }}
          >
            {effect.value > 0 ? `+${effect.value}` : -effect.value}
          </div>
        )}
      </div>

      {/* スタイル定義 */}
      <style jsx>{`
        .unit-container {
          animation: sway 2s ease-in-out infinite;
        }
        .unit-container.left {
          animation: move-left 0.5s forwards;
        }
        .unit-container.right {
          animation: move-right 0.5s forwards;
        }
        .unit-container.blink {
          animation: blink 0.9s forwards;
        }

        @keyframes move-left {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes move-right {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes blink {
          0%,
          20%,
          40%,
          60%,
          80%,
          100% {
            opacity: 1;
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  )
})
