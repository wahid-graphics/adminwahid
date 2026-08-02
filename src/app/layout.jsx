import './globals.css'

export const metadata = {
  title: 'Wahid Graphics — Premium Printing & Design',
  description: 'Wahid Graphics — Premium flex banners, visiting cards, logo design, shadi cards, brochures and more in Pakistan.',
  keywords: 'wahid graphics, printing, flex banner, visiting card, logo design, shadi card, Pakistan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
