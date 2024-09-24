// import { NextAuthProvider } from '@/lib/NextAuthProvider'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', width: '100vw' }}>
        {/* <NextAuthProvider> */}
        <AuthProvider>{children}</AuthProvider>
        {/* </NextAuthProvider> */}
      </body>
    </html>
  )
}
