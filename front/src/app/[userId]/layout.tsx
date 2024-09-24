import { UserProvider } from '@/context/UserContext'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', width: '100vw' }}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
