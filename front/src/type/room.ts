export type Room = {
  roomId: string
  hostUserId: string | null
  hostName: string | null
  hostAttack: number | null
  hostGuard: number | null
  hostSpeed: number | null
  hostHp: number | null
  hostMaxHp: number | null
  hostXp: number | null
  joinUserId: string | null
  joinName: string | null
  joinAttack: number | null
  joinGuard: number | null
  joinSpeed: number | null
  joinHp: number | null
  joinMaxHp: number | null
  joinXp: number | null
  turn: string | null
  isConnected: boolean
  isFinished: boolean
}
