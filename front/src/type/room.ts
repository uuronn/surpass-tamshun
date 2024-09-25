export type Room = {
  roomId: string
  hostUserId: string | null
  hostAttack: number | null
  hostGuard: number | null
  hostHp: number | null
  hostXp: number | null
  guestUserId: string | null
  isConnected: boolean
  isFinished: boolean
}
