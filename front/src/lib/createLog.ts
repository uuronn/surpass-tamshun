export function attackLog(name: string) {
  const phrases = ['熱くなれよ！', 'くらえ！', '燃えろ！', 'ナイスボレー、修造！']
  const phrase = phrases[Math.floor(Math.random() * phrases.length)]

  return `${name} の攻撃！熱いエネルギーを敵に向かって解き放った！『${phrase}』`
}

export function damageLog(name: string, value: number) {
  const phrases = [
    '世間はさぁ、冷てぇよなぁ... ',
    '崖っぷちありがとう！！最高だ！！',
    '大丈夫かな、あはぁ～ん...',
    '反省はしろ！後悔はするな！',
    '苦しいか？ 修造！笑え！',
  ]
  const phrase = phrases[Math.floor(Math.random() * phrases.length)]

  return `${name} は ${value} のダメージを受けた!『${phrase}』`
}

export function strikeLog(name: string) {
  const phrases = [
    'もっと、熱くなれよ！！！！',
    'ダシのある人間になれ！！',
    '一所懸命、一つの所に命を懸ける...',
    '言い訳してるんじゃないですか？？',
    '熱い血燃やしてけよ！！！',
  ]
  const phrase = phrases[Math.floor(Math.random() * phrases.length)]
  return `${name} が情熱の炎を解き放った！！ 『${phrase}』`
}

export function healLog(name: string, value: number) {
  const phrases = [
    'みんなイキイキするぞ！！',
    'あきらめんなよ！',
    'もう少し頑張ってみろよ！',
    'ネバーギブアップ ⭐️',
    'がんばれがんばれできるできる！！',
  ]
  const phrase = phrases[Math.floor(Math.random() * phrases.length)]
  return `${name} は熱い言葉で自らを鼓舞した！HPが ${value} 回復！『${phrase}』`
}
