import { useState } from 'react';
import PokemonBattleButtons from './Battle_buttons'

export default function Battle() {
  const [action, setAction] = useState('');

  const handleAction = (actionType: string) => {
    setAction(actionType);
    console.log(actionType);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/battle.jpg')`, // 背景画像
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* キャラクターの表示 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <img src="/battleshuzo.png" alt="shuozo 1" style={{ height: '400px' }} />
        <img src="/battleshuzo.png" alt="shuzo 2" style={{ height: '400px' }} />
      </div>

      {/* ボタン */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <PokemonBattleButtons />
        </div>
      </div>
    </div>
  );
}