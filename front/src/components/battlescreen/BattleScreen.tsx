'use client'

import Image from 'next/image'
import React from 'react'

export default function BattleScreen() {
  return (
    <div className="battleScreen">
      {/* 背景画像 */}
      <div className="background">
        <Image
          src="/battle_background.png" // 背景画像のパス
          alt=""
          className="backgroundImage"
        />
      </div>

      {/* キャラクター */}
      <div className="characters">
        <Image
          src="/character.png" // 左側のキャラクター画像
          alt=""
          className="character"
          style={{ left: '10%' }}
        />
        <Image
          src="/character.png" // 右側のキャラクター画像
          alt=""
          className="character"
          style={{ right: '10%' }}
        />
      </div>

      {/* ボタン */}
      <div className="actionButtons">
        <button className="actionButton attack">攻撃</button>
        <button className="actionButton defense">防御</button>
        <button className="actionButton skill">わざ</button>
      </div>

      {/* CSS-in-JSスタイル定義 */}
      <style jsx>{`
        .battleScreen {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .backgroundImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .characters {
          position: absolute;
          top: 30%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }

        .character {
          position: absolute;
          width: 20%;
        }

        .actionButtons {
          position: absolute;
          bottom: 10%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 20px;
          z-index: 3;
        }

        .actionButton {
          padding: 20px 40px;
          font-size: 24px;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          color: white;
        }

        .attack {
          background-color: #ff4b4b;
        }

        .defense {
          background-color: #4b8bff;
        }

        .skill {
          background-color: #ffa54b;
        }
      `}</style>
    </div>
  )
}
