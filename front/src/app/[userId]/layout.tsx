import { UserProvider } from '@/context/UserContext'
import './globals.css'
import { RoomProvider } from '@/context/RoomContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', width: '100vw' }}>
        <UserProvider>
          <RoomProvider>{children}</RoomProvider>
        </UserProvider>
      </body>
    </html>
  )
}
