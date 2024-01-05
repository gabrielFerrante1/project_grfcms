import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Providers } from '@/app/providers'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GRF Cms | Crie seu site',
  description: 'Crie o seu site agora! GRF Cms'
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;