export type Room = {
  roomId: string
  hostUserId: string | null
  hostName: string | null
  hostAttack: number | null
  hostGuard: number | null
  hostSpeed: number | null
  hostHp: number | null
  hostXp: number | null
  joinUserId: string | null
  joinName: string | null
  joinAttack: number | null
  joinGuard: number | null
  joinSpeed: number | null
  joinHp: number | null
  joinXp: number | null
  isConnected: boolean
  isFinished: boolean
}
