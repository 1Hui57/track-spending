import Header from "../component/Header";
import "../style.css";


export const metadata = {
  title: 'Track-Spending',
  description: '追蹤你的每筆開銷！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
