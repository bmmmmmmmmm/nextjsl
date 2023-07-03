export const metadata = {
  title: 'MlTest',
  description: 'MlTest',
}

export default function MlTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
